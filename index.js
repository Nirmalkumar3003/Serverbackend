const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routers/productRoutes");
const userRouter = require("./routers/userRoutes");
const cartRouter = require("./routers/cartRoutes");
const orderRoutes = require("./routers/orderRoutes");
const app = express();

app.use(express.json());

const port = 3003;
mongoose.connect("mongodb+srv://root:root@cm.nezmhqj.mongodb.net/?retryWrites=true&w=majority&appName=CM").then(() => {
    console.log("DB connected")
}).catch((e) => {
    console.log(e);
})

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRoutes);

app.listen(port, () => {
    console.log("Server running on port 3003");
})