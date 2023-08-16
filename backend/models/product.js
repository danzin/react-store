const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, unique: false },
    image: { type: String, required: true, unique: false },
    price: { type: Number, unique: false },
    countInStock: { type: Number, required: true, unique: false },
    brand: { type: String, required: true, unique: false },
    rating: { type: Number, required: true, unique: false },
    reviews: { type: Number, required: true, unique: false },
    description: { type: String, required: true, unique: false },
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model("Product", productSchema, "Products");

module.exports = Product;
