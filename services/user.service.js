const user_model = require("../models/user_model");

module.exports.CreateUser = async ({ User_name, email, password }) => {
  if (!User_name || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = user_model.create({
    User_name,
    email,
    password,
  });
  return user;
};
