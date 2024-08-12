const express = require("express");
const orderRoutes = express.Router();

const orderContoller = require("../controllers/orderContoller");
const auth = require("../middleware/auth");

orderRoutes.get("/", auth, orderContoller.getOrder);
orderRoutes.post("/", auth, orderContoller.createOrder);

module.exports = orderRoutes;