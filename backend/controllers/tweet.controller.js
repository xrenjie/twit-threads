const needle = require("needle");

const { config, apiQuery } = require("../config/config");

const apiUrl = "https://api.twitter.com/2/tweets/";
const convUrl = "https://api.twitter.com/2/tweets/search/recent";

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
//create thread then save to db
const getConversation = async (req, res) => {
  try {
    const root = await needle(
      "get",
      `${apiUrl}${req.params.id}`,
      apiQuery,
      config
    );

    const conversation_id = root.body.data.conversation_id;

    let result = await needle(
      "get",
      "https://api.twitter.com/2/tweets/search/recent",
      {
        query: `conversation_id:${conversation_id}`,
        "tweet.fields":
          "created_at,in_reply_to_user_id,author_id,referenced_tweets",
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

    const tree = await reconstructThread(root.body.data, conversation);

    return tree;
  } catch (err) {
    console.log(err);
    return {};
  }
  // if (result.body && result.body.data) {
  //   const conversation_id = result.body.data.conversation_id;

  //   const conversation = await needle(
  //     "get",
  //     "https://api.twitter.com/2/tweets/search/recent",
  //     {
  //       query: `conversation_id:${conversation_id}`,
  //       "tweet.fields":
  //         "created_at,in_reply_to_user_id,author_id,referenced_tweets",
  //     },
  //     config
  //   );
  //   if (conversation.body) {
  //     return conversation.body;
  //   }
  // } else {
  //   return { error: "Unable to fetch tweets" };
  // }
};

function reconstructThread(root, conversation) {
  const rootId = root.id;
  const rootAuthorId = root.author_id;
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
