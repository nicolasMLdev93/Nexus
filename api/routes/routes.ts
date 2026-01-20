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
  validate_rePost,
  validate_getPost,
  validate_getComment,
  validate_getLike,
  validate_LikeComment,
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
  val_existanceUser,
  val_existance_postParams,
  val_existance_commentParams,
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
  create_repost,
  get_userPosts,
  get_postComments,
  get_postLikes,
  get_commentLikes,
} = require("../controllers/controllers");
////////////////////////////////////////
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
// Make a repost
router.post(
  "/create_rePost",
  validate_rePost,
  validate_results,
  val_existanceUser_post,
  validate_token,
  create_repost,
);
// Get posts by user_id
router.get(
  "/posts_byUser/:user_id",
  validate_getPost,
  validate_results,
  val_existanceUser,
  validate_token,
  get_userPosts,
);
// Get likes by post_id
router.get(
  "/likes_byPost/:post_id",
  validate_getLike,
  validate_results,
  val_existance_postParams,
  validate_token,
  get_postLikes,
);
// Get comments by post_id
router.get(
  "/comments_byPosts/:post_id",
  validate_getComment,
  validate_results,
  val_existance_postParams,
  validate_token,
  get_postComments,
);
// Get likes by comment_id
router.get(
  "/likes_byComment/:comment_id",
  validate_LikeComment,
  validate_results,
  val_existance_commentParams,
  validate_token,
  get_commentLikes,
);
// Get reposts by user_id

// Get reposts by post_id

// Delete a post

// Delete a comment

// Delete a repost

// Unlike a post

// Unlike a comment

// Become a non-public post

module.exports = router;
export {};
