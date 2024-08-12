const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

productRouter.get("/", auth, productController.getProduct);
productRouter.post("/", auth, productController.createProduct);

module.exports = productRouter;