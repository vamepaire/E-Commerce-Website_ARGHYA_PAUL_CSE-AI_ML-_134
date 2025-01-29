const productsModel = require("../models/product_model");
const ownersModel = require("../models/owner_model");

module.exports.CreateProduct = async ({
  product_name,
  price,
  discount,
  image,
  bgcolor,
  panel_color,
  text_color,
  category,
  product_desc,
  owner_id,
}) => {
  try {
    if (
      !product_name ||
      !price ||
      !discount ||
      !image ||
      !bgcolor ||
      !panel_color ||
      !text_color ||
      !category ||
      !product_desc ||
      !owner_id
    ) {
      throw new Error("All fields are required");
    }

    const product = await productsModel.create({
      product_name,
      price,
      image,
      discount,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
      owner_id,
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw new Error("Error while creating product: " + error.message);
  }
};

module.exports.AddObjectId = async (req, res, next) => {
  const owner_id = req.Owner.id.toString();
  req.body.owner_id = owner_id;
  return next();
};
