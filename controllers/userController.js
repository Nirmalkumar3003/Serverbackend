const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async(req,res) => {
    const {username, email, password} = req.body;
    try {
        const newUser = await new User({
            username,
            email,
            password
        })
        await newUser.save();
        res.status(200).json({message: "User created sucessfully"});
    } catch(e) {
        console.log(e);
        res.status(400).json({error: e});
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users: users});
    } catch (e) {
        res.status(400).json({erro: e});
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "No user found"});
        }
        const isMatched = bcrypt.compare(user.password, password);

        if(!isMatched) {
            return res.status(400).json({error: "Password incorrect"});
        }

        const token = jwt.sign({user_id: user._id, email: email}, "secret_token", {
            expiresIn: "1h"
        })

        return res.status(200).json({token: token}); 


    } catch(e) {
        console.log(e)
        res.status(400).json({error: e});
    }
}