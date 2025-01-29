const { body, validationResult } = require("express-validator");

const productValidation = [
  body("product_name")
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters."),
  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number."),
  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100."),
  body("bgcolor")
    .optional()
    .isString()
    .withMessage("Background color must be a string."),
  body("panel_color")
    .optional()
    .isString()
    .withMessage("Panel color must be a string."),
  body("text_color")
    .optional()
    .isString()
    .withMessage("Text color must be a string."),
  body("category")
    .notEmpty()
    .withMessage("Category is required.")
    .isIn(["Fashion", "Grocery", "Electronics", "Home & Furniture", "Mobile"])
    .withMessage(
      "Invalid category. Must be one of Fashion, Grocery, Electronics, Home & Furniture, or Mobile."
    ),
  body("product_desc")
    .notEmpty()
    .withMessage("Product description is required.")
    .isLength({ min: 10 })
    .withMessage("Product description must be at least 10 characters long."),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  body("owner_id")
    .notEmpty()
    .withMessage("Owner ID is required.")
    .isMongoId()
    .withMessage("Invalid owner ID format."),
];

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required." });
  }
  next();
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { productValidation, validateImage, validate };
