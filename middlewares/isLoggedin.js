const jwt = require("jsonwebtoken");
require("dotenv").config();
async function isLoggedin(req, res, next) {
  try {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      req.flash("Error:", "No token found, Log in failed !");
      return res.redirect("/"); 
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);
    
    return res.status(401).send(error.message);
  }
}

module.exports = isLoggedin;
