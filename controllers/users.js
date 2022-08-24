const { response } = require("express");

const usersGet = (req, res = response) => {
  const { q, name = "No name", apikey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controller",
    q,
    name,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req, res = response) => {
  const body = req.body;
  res.json({
    msg: "post API - controller",
    body,
  });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controller",
    id,
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
