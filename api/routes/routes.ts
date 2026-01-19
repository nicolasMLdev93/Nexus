const express = require("express");
const router = express.Router();

// Chain validators
const {
  validate_newUser,
  validate_loginUser,
  validate_newPost,
} = require("../middlewares/chain_validator");
// Validate results
const { validate_results } = require("../middlewares/validate_results");
// Validate existant objects
const {
  val_existanceUser_register,
  val_existanceUser_login,
  val_existanceUser_post,
} = require("../middlewares/existence_validator");
// Validate token
const { validate_token } = require("../middlewares/validate_token");
// Controllers
const {
  register_user,
  login_user,
  create_post,
} = require("../controllers/controllers");
// Routes of the backend application //
// Register new user on application
router.post(
  "/register",
  validate_newUser,
  validate_results,
  val_existanceUser_register,
  register_user,
);
// Log in to your account
router.post(
  "/login",
  validate_loginUser,
  validate_results,
  val_existanceUser_login,
  login_user,
);
// Create new post
router.post(
  "/create_post",
  validate_newPost,
  validate_results,
  val_existanceUser_post,
  create_post,
);

module.exports = router;
export {};
