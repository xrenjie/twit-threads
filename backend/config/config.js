const token = process.env.BEARER_TOKEN;

const config = {
  headers: {
    "User-Agent": "v2TweetLookupJS",
    authorization: `Bearer ${token}`,
  },
};

const apiQuery = {
  "tweet.fields": `conversation_id,created_at,author_id,referenced_tweets,public_metrics`,
};

exports.config = config;
exports.apiQuery = apiQuery;
