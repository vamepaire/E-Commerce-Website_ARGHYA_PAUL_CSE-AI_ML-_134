const jwt = require("jsonwebtoken");
require("dotenv").config();
async function isLoggedin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.flash("Error:", "No token found, Log in failed !");
      return res.redirect("/");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.message != null) {
      res.clearCookie("token");
      res.redirect("/");
    }
  }
}

module.exports = isLoggedin;
