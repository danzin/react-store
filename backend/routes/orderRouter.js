const orderRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const {
  placeOrder,
  getOrder,
  payOrder,
  myOrders,
} = require("../controllers/orderController.js");
const { isAuth } = require("../utils/middleware.js");

orderRouter.post("/", isAuth, expressAsyncHandler(placeOrder));
orderRouter.get("/mine", isAuth, expressAsyncHandler(myOrders));

orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrder));
orderRouter.put("/:id/pay", isAuth, expressAsyncHandler(payOrder));

module.exports = orderRouter;
