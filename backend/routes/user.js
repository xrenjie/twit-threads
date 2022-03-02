const router = require("express").Router();
const { getUser, getUsers } = require("../controllers/user.controller.js");

router.route("/multi").get(async (req, res) => {
  const ids = req.query.ids;
  const result = await getUsers(req, res, ids);
  res.json(result);
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const result = await getUser(req, res, id);
  res.json(result);
});

module.exports = router;
