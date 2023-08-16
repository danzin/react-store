const { data } = require("../data.js");
const Product = require("../models/product");

const getAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getSingleBySlug = async (req, res) => {
  const slug = req.params.slug;
  const filter = { slug: req.params.slug };
  const product = await Product.findOne(filter);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product not found" });
};

const getSingleById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await Product.findById(req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product not found" });
};

module.exports = {
  getAll,
  getSingleBySlug,
  getSingleById,
};
