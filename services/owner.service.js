const { logOut } = require("../controllers/user.controller");
const Owner_Model = require("../models/owner_model");
module.exports.CreateOwner = async ({
  User_name,
  Shop_name,
  email,
  password,
  address,
  gstIn,
}) => {
  if (!User_name || !Shop_name || !email || !password || !address || !gstIn) {
    throw new Error("All fields are required");
  }
  const owner = await Owner_Model.create({
    User_name,
    Shop_name,
    email,
    password,
    address,
    gstIn,
  });
  return owner;
};
