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

const getCategories = async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
};

const searchProducts = async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || 3;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
};

module.exports = {
  getAll,
  getSingleBySlug,
  getSingleById,
  getCategories,
  searchProducts,
};
