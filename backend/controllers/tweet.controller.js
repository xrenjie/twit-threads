const needle = require("needle");
const Thread = require("../models/Thread.model");
const { config, apiQuery } = require("../config/config");

const apiUrl = "https://api.twitter.com/2/tweets/";
const convUrl = "https://api.twitter.com/2/tweets/search/recent";

//get root tweet
const getTweet = async (req, res) => {
  const result = await needle(
    "get",
    `${apiUrl}${req.params.id}`,
    apiQuery,
    config
  );

  if (result.body && result.body.data) {
    return result.body.data;
  } else return {};
};

//continually get conversation using next_token param
//until meta.result_count < 10
//then organize tweets using referenced_tweets.type = "replied_to"
//first check if thread saved in db
//else save thread to db and return
const getConversation = async (req, res) => {
  try {
    const root = await needle(
      "get",
      `${apiUrl}${req.params.id}`,
      apiQuery,
      config
    );

    const conversation_id = root.body.data.conversation_id;

    //first try to get conversation from db
    //must be at most 30 minutes old
    const thread = await Thread.findOne({ conversation_id: req.params.id });
    if (thread && new Date(thread.last_updated) - new Date() < 1000 * 60 * 15) {
      console.log("found thread in db");
      return reconstructThread(root.body.data, thread.conversation);
    }

    let result = await needle(
      "get",
      "https://api.twitter.com/2/tweets/search/recent",
      {
        query: `conversation_id:${conversation_id}`,
        "tweet.fields":
          "created_at,in_reply_to_user_id,author_id,referenced_tweets,public_metrics",
      },
      config
    );

    if (result.body.status === 429) {
      return {};
    }
    let num_results = result.body.meta.result_count;
    const conversation = [...result.body.data];
    let next_token = result.body.meta.next_token;
    const query = {
      ...apiQuery,
      query: `conversation_id:${conversation_id}`,
      next_token: next_token,
    };
    await setTimeout(() => {}, 3000);

    if (next_token) {
      while (num_results >= 10 && next_token) {
        result = await needle("get", `${convUrl}`, query, config);
        conversation.push(...result.body.data);
        num_results = result.body.meta.result_count;
        next_token = result.body.meta.next_token;
        query.next_token = next_token;
        await setTimeout(() => {}, 3000);
      }
    }

    const newThread = new Thread({
      conversation_id: conversation_id,
      conversation: conversation,
      last_updated: new Date(),
    });

    newThread.save();

    const tree = await reconstructThread(root.body.data, conversation);

    return tree;
  } catch (err) {
    console.log(err);
    return {};
  }
};

//reconstruct thread from root tweet and all other tweets
//result is JSON object with all IDs as keys and
//array of replies as values
function reconstructThread(root, conversation) {
  const rootId = root.id;
  const tree = { [rootId]: [] };
  conversation.forEach((tweet) => {
    if (tweet.referenced_tweets) {
      const refs = tweet.referenced_tweets;
      refs.forEach((ref) => {
        if (ref.type === "replied_to") {
          if (!tree[ref.id]) tree[ref.id] = [];
          tree[ref.id] = [...tree[ref.id], tweet];
        }
      });
    }
  });
  return tree;
}

exports.getTweet = getTweet;
exports.getConversation = getConversation;
