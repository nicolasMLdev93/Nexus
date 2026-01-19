import { body, param, query, ValidationChain } from "express-validator";

// Chain validator for create a new user
export const validate_newUser: ValidationChain[] = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isString()
    .withMessage("Email must be a string")
    .isLength({ max: 40 })
    .withMessage("The max length of your email must be 100 char"),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ max: 20 })
    .withMessage("The max length of your password must be 20 char"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords do not match!");
    } else {
      return true;
    }
  }),
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ max: 30 })
    .withMessage("The max length of your name must be 30 char"),
  body("surname")
    .notEmpty()
    .withMessage("Surname is required!")
    .isString()
    .withMessage("Surname must be a string")
    .isLength({ max: 30 })
    .withMessage("The max length of your Surname must be 30 char"),
  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string!")
    .isIn(["admin", "user"])
    .withMessage("Invalid role! Must be: admin or user")
    .default("user"),
];

// Chain validator for login into an account
export const validate_loginUser: ValidationChain[] = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isString()
    .withMessage("Email must be a string")
    .isLength({ max: 40 })
    .withMessage("The max length of your email must be 100 char"),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ max: 20 })
    .withMessage("The max length of your password must be 20 char"),
];
