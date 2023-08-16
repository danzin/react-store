const orderRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { placeOrder, getOrder } = require("../controllers/orderController.js");
const { isAuth } = require("../utils/middleware");

orderRouter.post("/", isAuth, expressAsyncHandler(placeOrder));
orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrder));

module.exports = orderRouter;
