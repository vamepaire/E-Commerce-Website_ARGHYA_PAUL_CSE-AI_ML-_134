const { body } = require("express-validator");

module.exports.UserRegistrationValidator = [
  body("email").isEmail().withMessage("Invalid Email"),

  body("User_name")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters long")
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage(
      "Username should only contain alphanumeric characters and underscores"
    ),

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
];
module.exports.UserloginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters"),
];
