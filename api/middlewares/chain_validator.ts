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

// Chain validator for create a new post
export const validate_newPost: ValidationChain[] = [
  body("content")
    .notEmpty()
    .withMessage("Content is required!")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ max: 200 })
    .withMessage("The max length of your email must be 200 char"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain validator for make a like to a post
export const validate_Post_like: ValidationChain[] = [
  body("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain validator for create a new comment in a post
export const validate_newComment: ValidationChain[] = [
  body("content")
    .notEmpty()
    .withMessage("Content is required!")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ max: 200 })
    .withMessage("The max length of your email must be 200 char"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
  body("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
];

// Chain validator for make a like to a post
export const validate_Comment_like: ValidationChain[] = [
  body("comment_id")
    .notEmpty()
    .withMessage("comment_id is required!")
    .isNumeric()
    .withMessage("comment_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain validator for make a repost
export const validate_rePost: ValidationChain[] = [
  body("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain valdiator for get posts by user_id
export const validate_getPost: ValidationChain[] = [
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain valdiator for get comments by post
export const validate_getComment: ValidationChain[] = [
  param("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
];

// Chain valdiator for get likes by post
export const validate_getLike: ValidationChain[] = [
  param("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
];

// Chain valdiator for get likes by commnet
export const validate_LikeComment: ValidationChain[] = [
  param("comment_id")
    .notEmpty()
    .withMessage("comment_id is required!")
    .isNumeric()
    .withMessage("comment_id must be an integer"),
];

// Chain valdiator for get reposts by user
export const validate_repostUser: ValidationChain[] = [
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain valdiator for unlike a post
export const validate_unlikePost: ValidationChain[] = [
  body("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain valdiator for unlike a commnet
export const validate_unlikeComment: ValidationChain[] = [
  body("comment_id")
    .notEmpty()
    .withMessage("comment_id is required!")
    .isNumeric()
    .withMessage("comment_id must be an integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is required!")
    .isNumeric()
    .withMessage("user_id must be an integer"),
];

// Chain valdiator delete comment
export const validate_deleteComment: ValidationChain[] = [
  param("comment_id")
    .notEmpty()
    .withMessage("comment_id is required!")
    .isNumeric()
    .withMessage("comment_id must be an integer"),
];

// Chain valdiator delete re-post
export const validate_deleteRepost: ValidationChain[] = [
  param("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
];

// Chain valdiator delete post
export const validate_deletePost: ValidationChain[] = [
  param("post_id")
    .notEmpty()
    .withMessage("post_id is required!")
    .isNumeric()
    .withMessage("post_id must be an integer"),
];
