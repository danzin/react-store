const userRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const {
  getAll,
  signInUser,
  getSingleById,
  signUpUser,
} = require("../controllers/usersController");

userRouter.get("/", getAll);
userRouter.post("/signin", expressAsyncHandler(signInUser));
userRouter.post("/signup", expressAsyncHandler(signUpUser));
userRouter.get("/:id", getSingleById);

module.exports = userRouter;
