const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
// exports.getCart = async (req, res) => {
//     try {
//         const cart = await Cart.find();
//         res.status(200).json({cart: cart});
//     } catch (e) {
//         console.log(e);
//         res.status(400).json({error: e});
//     }
// }

exports.createCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = await new Cart({
        user_id,
        products: [
          {
            product_id,
            quantity,
          },
        ],
      });
      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart is created and product added successfully" });
    }
    const productIndex = cart.products.findIndex(
      (prd) => prd.product_id === product_id
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: "Quantity updated successfully" });
    } else {
      cart.products.push({
        product_id,
        quantity,
      });
      await cart.save();
      return res.status(200).json({ message: "Product added successfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

exports.getCart = async (req, res) => {
  const { user_id } = req.user;
  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(400).json({ error: "Cart is empty, Create a cart" });
    }
    console.log(cart);

    // calculate total

    // let total = 0;
    // for(let i = 0; i < cart.products.length; i++) {
    //     const product = await Product.findOne({_id: cart.products[i].product_id});
    //     if(product) {
    //         let price = product.price;
    //         let quantity = cart.products[i].quantity;
    //         total += price * quantity;
    //     } else {
    //         console.log("Product not found");
    //     }
    // }

    // const totalMap = await Promise.all(cart.products.map(async (prod) => {
    //     const product = await Product.findOne({_id :prod.product_id});
    //     console.log("product found")
    //     let price = product.price;
    //     let quantity = prod.quantity;
    //     console.log(price * quantity);
    //     return price * quantity;
    // }))
    // console.log(totalMap);

    // res.status(200).json({total: total});
    let subTotal = 0;
    const cartItem = await Promise.all(
      cart.products.map(async (product) => {
        const productDetails = await Product.findOne({
          id: product.product_id,
        });
        console.log(productDetails);
        subTotal += productDetails.price * product.quantity;
        return {
          product_id: productDetails.id,
          title: productDetails.title,
          description: productDetails.description,
          price: productDetails.price,
          image: productDetails.image,
          quantity: product.quantity,
        };
      })
    );

    res.status(200).json({ cartItem: cartItem });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

exports.deleteCart = async (req, res) => {
  const { user_id } = req.user;
  const { product_id } = req.params;

  try {
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const isProductValid = cart.products.find(
      (product) => product.product_id == product_id
    );

    if (!isProductValid) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (cart.products.length <= 1) {
      await Cart.deleteOne({ user_id });
      return res.status(200).json({ message: "Cart deleted sucessfully" });
    } else {
      cart.products = cart.products.filter(
        (prod) => prod.product_id !== product_id
      );
      await cart.save();
      return res.status(200).json({ message: "Product deleted sucessfully" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }

  // const {user_id} = req.user;
  // const {product_id} = req.body;
  // try {
  //     let cart = await Cart.findOne({user_id});
  //     if(!cart) {
  //         return res.status(400).json({error: "Cart is empty, Create a cart"});
  //     }

  //     if(cart.products.length <= 1) {
  //         if(cart.products[0].product_id === product_id ) {
  //             await Cart.deleteOne({user_id});
  //             return res.status(200).json({message: "The last product in the cart has been deleted and the cart is now empty"});
  //         } else {
  //             return res.status(200).json({message: "The id does not match"});
  //         }
  //     } else {
  //         const editiedCart = cart.products.filter((el) => el.product_id !== product_id);
  //         if(editiedCart.length != cart.products.length) {
  //             return res.status(200).json({message: "Product in the cart is deleted"});
  //         }
  //         cart.products = editiedCart;
  //         await cart.save();
  //         return res.status(200).json({message: "Product in the cart is deleted"});
  //     }
  // } catch(e) {
  //     console.log(e);
  //     res.status(400).json({error: e.message});
  // }
};
