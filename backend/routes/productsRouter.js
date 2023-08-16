const productsRouter = require("express").Router();
const {
  getAll,
  getSingleBySlug,
  getSingleById,
} = require("../controllers/productsController");

productsRouter.get("/", getAll);

productsRouter.get("/slug/:slug", getSingleBySlug);

productsRouter.get("/:id", getSingleById);

module.exports = productsRouter;
