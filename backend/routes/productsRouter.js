const productsRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

const {
  getAll,
  getSingleBySlug,
  getSingleById,
  getCategories,
  searchProducts,
} = require("../controllers/productsController");

productsRouter.get("/", getAll);

productsRouter.get("/categories", expressAsyncHandler(getCategories));
productsRouter.get("/search", expressAsyncHandler(searchProducts));

productsRouter.get("/slug/:slug", getSingleBySlug);

productsRouter.get("/:id", getSingleById);

module.exports = productsRouter;
