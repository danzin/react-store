const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const productsRouter = require("./routes/productsRouter.js");
const seedRouter = require("./routes/seedRoutes.js");
const userRouter = require("./routes/userRouter.js");
const orderRouter = require("./routes/orderRoute");
const cors = require("cors");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sandbox");
});

app.use("/api/products/", productsRouter);
app.use("/api/users/", userRouter);
app.use("/api/seed/", seedRouter);
app.use("/api/orders/", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

module.exports = app;
