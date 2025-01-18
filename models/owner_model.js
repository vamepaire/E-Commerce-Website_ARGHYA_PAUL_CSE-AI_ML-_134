const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  User_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Model", // Reference to the Product model
    },
  ],
  image: {
    type: String,
  },
  gstIn: {
    type: String,
  },
});

ownerSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

ownerSchema.statics.generatePassword = async function (password) {
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

ownerSchema.methods.verifyPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("Owner_Model", ownerSchema);
