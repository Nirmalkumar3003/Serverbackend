const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrder = async (req, res) => {
    const {user_id, email} = req.user;
    const {user_name, user_address, phone_number} = req.body;
    try {
        const cart = await Cart.findOne({user_id});
        if(!cart) {
            return res.status(400).json({error: "Add a product in the cart to checkout"});
        }

        // const order = await Order.findOne({user_id});

        // if(order) {
        //     order.products.push(...cart.products);
        //     order.save();
        //     await Cart.deleteOne({user_id});
        //     return res.status(200).json({ message: "Order upadated" });
        // }
        

        const newOrder = await new Order({
            user_id,
            user_name,
            user_address,
            phone_number,
            products: cart.products,
            user_email: email
        });

        await newOrder.save();
        await Cart.deleteOne({user_id});
        return res.status(200).json({ message: newOrder });
    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}

exports.getOrder = async (req, res) => {
    const {user_id} = req.user;
    try {
        const order = await Order.find({user_id});
        return res.status(200).json( order );
    } catch(e) {
        res.status(400).json({ error: e.message });   
    }
}