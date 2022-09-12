const { response } = require("express");
const { Category } = require("../models");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${name} already exists`,
    });
  }

  const data = {
    name,
    user: req.userAuth._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json(category);
};

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).skip(from).limit(limit).populate("user", "name"),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const id = req.params.id;

  const categoryDB = await Category.findById(id).populate("user", "name");

  res.json(categoryDB);
};

const updateCategory = async (req, res = response) => {
  const id = req.params.id;
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${name} already exists`,
    });
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  res.json({ category });
};

const deleteCategory = async (req, res = response) => {
  id = req.params.id;

  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json({ category });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
