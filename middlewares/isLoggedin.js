const jwt = require("jsonwebtoken");
const user_model = require("../models/user_model");
require("dotenv").config();
const blackListTokenSchema = require("../models/balckListToken.model");

async function isLoggedin(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "Unauthenticated User",
    });
  const balckListToken = await blackListTokenSchema.findOne({ token: token });
  if (balckListToken) {
    res.status(401).json({ message: "Unauthorized Access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const user = await user_model.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Token is Invalid",
    });
  }
}
module.exports = isLoggedin;
