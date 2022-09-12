const { response } = require("express");
const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(from)
      .limit(limit)
      .populate("user", "name")
      .populate("category", "name"),
  ]);

  res.json({ total, products });
};

const getProductById = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { name, price, category, description } = req.body;

  const productDB = await Product.findOne({ name });
  if (productDB) {
    return res.status(400).json({
      msg: `The proudct ${name} already exists`,
    });
  }

  const product = new Product({
    name: name.toUpperCase(),
    user: req.userAuth._id,
    price,
    category,
    description,
  });

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { name, price, category, description } = req.body;

  const productDB = await Product.findOne({ name: name.toUpperCase() });
  if (productDB) {
    return res.status(400).json({
      msg: `The proudct ${name} already exists`,
    });
  }

  const data = {
    name: name.toUpperCase(),
    price,
    category,
    description,
  };

  const productUpdated = await Product.findOneAndUpdate(id, data, {
    new: true,
  });

  res.json(productUpdated);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(productDeleted);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
