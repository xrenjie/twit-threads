const needle = require("needle");
const { config, apiQuery } = require("../config/config");

const userUrl = "https://api.twitter.com/2/users";

const getUsers = async (req, res, ids) => {
  const result = await needle(
    "get",
    `${userUrl}`,
    {
      ids: ids,
    },
    config
  );

  return result.body;
};

const getUser = async (req, res, id) => {
  const result = await needle("get", `${userUrl}/${id}`, {}, config);

  return result.body;
};

exports.getUsers = getUsers;
exports.getUser = getUser;
