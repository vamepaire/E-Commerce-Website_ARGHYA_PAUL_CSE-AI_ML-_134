const { body } = require("express-validator");

module.exports.OwnerRegistrationValidator = [
  // Validate User_name
  body("User_name")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters long")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      "User name should only contain alphanumeric characters and underscores"
    ),

  // Validate Shop_name
  body("Shop_name")
    .isLength({ min: 3 })
    .withMessage("Shop name must be at least 3 characters long")
    .matches(/^[A-Za-z0-9_ ]+$/)
    .withMessage(
      "Shop name should only contain alphanumeric characters and spaces"
    ),

  // Validate address fields
  body("address.street").notEmpty().withMessage("Street address is required"),
  body("address.pincode")
    .isNumeric()
    .withMessage("Pincode must be a number")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be exactly 6 digits"),

  // Validate email
  body("email").isEmail().withMessage("Invalid email address"),

  // Validate password
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character"),

  // Validate GSTIN
  body("gstIn")
    .isLength({ min: 8, max: 8 })
    .withMessage("GST Number must be exactly 8 digits"),
];

module.exports.OwnerLoginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
];
