const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

cartRouter.get("/",auth, cartController.getCart);
cartRouter.post("/",auth, cartController.createCart);
cartRouter.post("/delete/:product_id", auth, cartController.deleteCart);

module.exports = cartRouter;