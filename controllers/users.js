const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role, state, google } = req.body;
  const user = new User({ name, email, password, role, state, google });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save at DB
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;

  // TODO: validate against DB
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({ user });
};

const usersDelete = async (req, res = response) => {
  const id = req.params.id;

  // Delete fisicly
  // const user = await User.findByIdAndRemove(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
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
