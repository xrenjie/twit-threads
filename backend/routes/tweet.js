const router = require("express").Router();
const {
  getConversation,
  getTweet,
  getLatestTweets,
} = require("../controllers/tweet.controller.js");

router.route("/latest").get(async (req, res) => {
  console.log("getting latest");
  const result = await getLatestTweets(req, res);
  res.json(result);
});

//get single root tweet
router.route("/:id").get(async (req, res) => {
  console.log("getting tweet");
  const result = await getTweet(req, res);
  res.json(result);
});

//get conversation from root tweet conversation_id
router.route("/replies/:id").get(async (req, res) => {
  const result = await getConversation(req, res);
  res.json(result);
});

module.exports = router;
