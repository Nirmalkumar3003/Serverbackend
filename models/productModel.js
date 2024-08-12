const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id :{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    },
    rating:{
        rate:{
            type:String,
        },
        count:{
            type:String,
        }
    }
})

const Product = new mongoose.model("product", productSchema);

module.exports = Product;