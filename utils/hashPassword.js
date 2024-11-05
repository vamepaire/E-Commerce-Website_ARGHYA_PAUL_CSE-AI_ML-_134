const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(15); // Adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
}

module.exports = hashPassword;
