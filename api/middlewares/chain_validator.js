"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_deletePost = exports.validate_deleteRepost = exports.validate_deleteComment = exports.validate_unlikeComment = exports.validate_unlikePost = exports.validate_repostUser = exports.validate_LikeComment = exports.validate_getLike = exports.validate_getComment = exports.validate_getPost = exports.validate_rePost = exports.validate_Comment_like = exports.validate_newComment = exports.validate_Post_like = exports.validate_newPost = exports.validate_loginUser = exports.validate_newUser = void 0;
const express_validator_1 = require("express-validator");
// Chain validator for create a new user
exports.validate_newUser = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isString()
        .withMessage("Email must be a string")
        .isLength({ max: 40 })
        .withMessage("The max length of your email must be 100 char"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ max: 20 })
        .withMessage("The max length of your password must be 20 char"),
    (0, express_validator_1.body)("passwordConfirmation").custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("Passwords do not match!");
        }
        else {
            return true;
        }
    }),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("Name is required!")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ max: 30 })
        .withMessage("The max length of your name must be 30 char"),
    (0, express_validator_1.body)("surname")
        .notEmpty()
        .withMessage("Surname is required!")
        .isString()
        .withMessage("Surname must be a string")
        .isLength({ max: 30 })
        .withMessage("The max length of your Surname must be 30 char"),
    (0, express_validator_1.body)("role")
        .optional()
        .isString()
        .withMessage("Role must be a string!")
        .isIn(["admin", "user"])
        .withMessage("Invalid role! Must be: admin or user")
        .default("user"),
];
// Chain validator for login into an account
exports.validate_loginUser = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isString()
        .withMessage("Email must be a string")
        .isLength({ max: 40 })
        .withMessage("The max length of your email must be 100 char"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isString()
        .withMessage("Password must be a string")
        .isLength({ max: 20 })
        .withMessage("The max length of your password must be 20 char"),
];
// Chain validator for create a new post
exports.validate_newPost = [
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Content is required!")
        .isString()
        .withMessage("Content must be a string")
        .isLength({ max: 200 })
        .withMessage("The max length of your email must be 200 char"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain validator for make a like to a post
exports.validate_Post_like = [
    (0, express_validator_1.body)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain validator for create a new comment in a post
exports.validate_newComment = [
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Content is required!")
        .isString()
        .withMessage("Content must be a string")
        .isLength({ max: 200 })
        .withMessage("The max length of your email must be 200 char"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
    (0, express_validator_1.body)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
];
// Chain validator for make a like to a post
exports.validate_Comment_like = [
    (0, express_validator_1.body)("comment_id")
        .notEmpty()
        .withMessage("comment_id is required!")
        .isNumeric()
        .withMessage("comment_id must be an integer"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain validator for make a repost
exports.validate_rePost = [
    (0, express_validator_1.body)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain valdiator for get posts by user_id
exports.validate_getPost = [
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain valdiator for get comments by post
exports.validate_getComment = [
    (0, express_validator_1.param)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
];
// Chain valdiator for get likes by post
exports.validate_getLike = [
    (0, express_validator_1.param)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
];
// Chain valdiator for get likes by commnet
exports.validate_LikeComment = [
    (0, express_validator_1.param)("comment_id")
        .notEmpty()
        .withMessage("comment_id is required!")
        .isNumeric()
        .withMessage("comment_id must be an integer"),
];
// Chain valdiator for get reposts by user
exports.validate_repostUser = [
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain valdiator for unlike a post
exports.validate_unlikePost = [
    (0, express_validator_1.body)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain valdiator for unlike a commnet
exports.validate_unlikeComment = [
    (0, express_validator_1.body)("comment_id")
        .notEmpty()
        .withMessage("comment_id is required!")
        .isNumeric()
        .withMessage("comment_id must be an integer"),
    (0, express_validator_1.body)("user_id")
        .notEmpty()
        .withMessage("user_id is required!")
        .isNumeric()
        .withMessage("user_id must be an integer"),
];
// Chain valdiator delete comment
exports.validate_deleteComment = [
    (0, express_validator_1.param)("comment_id")
        .notEmpty()
        .withMessage("comment_id is required!")
        .isNumeric()
        .withMessage("comment_id must be an integer"),
];
// Chain valdiator delete re-post
exports.validate_deleteRepost = [
    (0, express_validator_1.param)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
];
// Chain valdiator delete post
exports.validate_deletePost = [
    (0, express_validator_1.param)("post_id")
        .notEmpty()
        .withMessage("post_id is required!")
        .isNumeric()
        .withMessage("post_id must be an integer"),
];
