const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "2h" }
  );
}

module.exports = { generateToken };
