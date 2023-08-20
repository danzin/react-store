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

const payOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found" });
  }
};

const myOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.send(orders);
};

module.exports = {
  placeOrder,
  getOrder,
  payOrder,
  myOrders,
};
