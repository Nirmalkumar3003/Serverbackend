const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if(!token) {
        return res.status(400).json({error: "No Token found"});
    }
    try {
        const decoded = jwt.verify(token, "secret_token");
        req.user = decoded;
        console.log(decoded);
        next();
    } catch(e) {
        res.status(500).json({error: "Invalid token"})
    }
}

module.exports = auth;
