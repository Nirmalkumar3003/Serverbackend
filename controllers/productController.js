const Product = require("../models/productModel");
const { v4: uuidv4} = require("uuid");
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json({allProduct: product});
    } catch(e) {
        res.status(200).json({error: e});
    }
}

exports.createProduct = async (req, res) => {
    const {title, description, price, category, image, rating} = req.body;
     try {
        const newProduct = new Product({
            id: uuidv4(),
            title,
            description,
            price,
            category,
            image,
            rating
        })
        console.log(newProduct);
        newProduct.save();
        res.status(200).json({message: "Product created sucesssfully"});
    } catch(e) {
        res.status(400).json({error: e});
    }
}