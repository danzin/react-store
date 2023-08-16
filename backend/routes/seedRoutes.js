const seedRouter = require("express").Router();
const Product = require("../models/product");
const User = require("../models/user");
const { data } = require("../data");

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const products = await Product.insertMany(data.products);
  await User.deleteMany({});
  const users = await User.insertMany(data.users);
  res.send({ products, users });
});

module.exports = seedRouter;
