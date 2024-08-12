    const mongoose = require("mongoose");

    const orderSchema = new mongoose.Schema({
        user_id: String,
        user_name: String,
        user_address: String,
        phone_number: String,
        products: [{
            product_id: String,
            quantity: Number,
        }],
        order_date: {
            type: Date,
            default: Date.now,
        },
        estimate_delivery_date: {
            type: Date, 
            default: function () {
                let date = new Date();
                date.setDate(date.getDate() + 10);
                return date;
            }
        },
        user_email: String,
    })

    const Order = new mongoose.model("order", orderSchema);

    module.exports = Order;