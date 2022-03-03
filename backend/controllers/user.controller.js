const needle = require("needle");
const { config } = require("../config/config");

const userUrl = "https://api.twitter.com/2/users";

//get multiple users (up to 100 at a time, comma separated list)
const getUsers = async (req, res, ids) => {
  const params = {
    ids: ids,
    "user.fields": "verified,profile_image_url",
  };
  const result = await needle("get", `${userUrl}`, params, config);

  return result.body;
};

//get one user (currently unused)
const getUser = async (req, res, id) => {
  const params = {
    "user.fields": "verified,profile_image_url",
  };
  const result = await needle("get", `${userUrl}/${id}`, params, config);

  return result.body;
};

exports.getUsers = getUsers;
exports.getUser = getUser;
