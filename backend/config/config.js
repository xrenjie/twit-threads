const apiUrl = "https://api.twitter.com/2";
const token = process.env.BEARER_TOKEN;

const config = {
  headers: {
    "User-Agent": "v2TweetLookupJS",
    authorization: `Bearer ${token}`,
  },
};
const apiQuery = {
  "tweet.fields": `conversation_id,created_at,author_id,referenced_tweets`,
};

exports.apiUrl = apiUrl;
exports.config = config;
exports.apiQuery = apiQuery;
