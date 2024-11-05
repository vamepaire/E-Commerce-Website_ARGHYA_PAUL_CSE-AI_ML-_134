const jwt = require("jsonwebtoken");
const config = require("config");

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    `${config.get("JWT_KEY")}`,
    { expiresIn: "1h" }
  );
}

module.exports = { generateToken };
