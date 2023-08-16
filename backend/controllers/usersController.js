const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/gent.js");
const getAll = async (req, res) => {
  const products = await User.find();
  res.send(products);
};

const getSingleById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const product = await User.findById(req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "User not found" });
};

const signInUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
};

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ name }, { email }] });
  if (existingUser) {
    if (existingUser.name === name) {
      return res.status(409).json({ error: "Username already in use." });
    } else if (existingUser.email === email) {
      return res.status(409).json({ error: "Email already in use." });
    }
  }
  const user = await User.create({
    name: name,
    email: email,
    passwordHash: bcrypt.hashSync(password),
  });
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
};

module.exports = {
  getAll,
  signInUser,
  signUpUser,
  getSingleById,
};
