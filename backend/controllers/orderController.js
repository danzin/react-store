const User = require("../models/user.js");
const Product = require("../models/product.js");
const Order = require("../models/order.js");

const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order not found" });
  }
};

const placeOrder = async (req, res) => {
  console.log(req.user.id);
  const order = await Order.create({
    orderItems: req.body.orderItems.map((x) => ({ ...x, product: x.id })),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user.id,
  });

  res.status(201).send({ message: "New Order Created", order });
};

module.exports = {
  placeOrder,
  getOrder,
};
