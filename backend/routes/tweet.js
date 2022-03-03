const router = require("express").Router();
const {
  getConversation,
  getTweet,
} = require("../controllers/tweet.controller.js");

//get single root tweet
router.route("/:id").get(async (req, res) => {
  const result = await getTweet(req, res);
  res.json(result);
});

//get conversation from root tweet conversation_id
router.route("/replies/:id").get(async (req, res) => {
  const result = await getConversation(req, res);
  res.json(result);
});

module.exports = router;
