const userRouter = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const { isAuth } = require("../utils/middleware.js");

const {
  getAll,
  signInUser,
  getSingleById,
  signUpUser,
  updateUser,
} = require("../controllers/usersController");

userRouter.get("/", getAll);
userRouter.post("/signin", expressAsyncHandler(signInUser));
userRouter.post("/signup", expressAsyncHandler(signUpUser));
userRouter.put("/profile", isAuth, expressAsyncHandler(updateUser));

userRouter.get("/:id", getSingleById);

module.exports = userRouter;
