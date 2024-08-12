const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.get("/", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.login);

module.exports = userRouter