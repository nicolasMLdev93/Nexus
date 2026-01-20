const express = require("express");
const router = express.Router();

// Chain validators
const {
  validate_newUser,
  validate_loginUser,
  validate_newPost,
  validate_Post_like,
  validate_newComment,
  validate_Comment_like,
} = require("../middlewares/chain_validator");
// Validate results
const { validate_results } = require("../middlewares/validate_results");
// Validate existant objects
const {
  val_existanceUser_register,
  val_existanceUser_login,
  val_existanceUser_post,
  val_existance_post,
  val_existance_comment,
} = require("../middlewares/existence_validator");
// Validate token
const { validate_token } = require("../middlewares/validate_token");
// Controllers
const {
  register_user,
  login_user,
  create_post,
  like_post,
  create_comment,
  like_comment,
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
  validate_token,
  create_post,
);
// Give a like to a post
router.post(
  "/create_postLike",
  validate_Post_like,
  validate_results,
  val_existanceUser_post,
  validate_token,
  like_post,
);
// Create new comment
router.post(
  "/create_comment",
  validate_newComment,
  validate_results,
  val_existanceUser_post,
  val_existance_post,
  validate_token,
  create_comment,
);
// Give a like to a post
router.post(
  "/create_commentLike",
  validate_Comment_like,
  validate_results,
  val_existance_comment,
  validate_token,
  like_comment,
);

module.exports = router;
export {};
