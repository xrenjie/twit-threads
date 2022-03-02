const needle = require("needle");
const { config, apiQuery } = require("../config/config");

const userUrl = "https://api.twitter.com/2/users";

const getUsers = async (req, res, ids) => {
  const params = {
    ids: ids,
    "user.fields": "verified,profile_image_url",
  };
  const result = await needle("get", `${userUrl}`, params, config);

  return result.body;
};

const getUser = async (req, res, id) => {
  const params = {
    "user.fields": "verified,profile_image_url",
  };
  const result = await needle("get", `${userUrl}/${id}`, params, config);

  return result.body;
};

exports.getUsers = getUsers;
exports.getUser = getUser;
