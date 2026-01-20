"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.val_existance_commentParams = exports.val_existance_postParams = exports.val_existanceUser = exports.val_existance_comment = exports.val_existance_post = exports.val_existanceUser_post = exports.val_existanceUser_login = exports.val_existanceUser_register = void 0;
const { users, posts, comments } = require("../../models");
// Validate existance user for register
const val_existanceUser_register = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await users.findOne({ where: { email: email } });
        if (user) {
            res.status(400).json({
                error: `A user with the email ${email} already exists.`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existanceUser_register = val_existanceUser_register;
// Validate existance user for login
const val_existanceUser_login = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await users.findOne({ where: { email: email } });
        if (!user) {
            res.status(400).json({
                error: `A user with the email ${email} not exists; try with other email`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existanceUser_login = val_existanceUser_login;
// Validate existant user
const val_existanceUser_post = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const user = await users.findOne({ where: { id: user_id } });
        if (!user) {
            res.status(400).json({
                error: `A user with the id ${user_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existanceUser_post = val_existanceUser_post;
// Validate existant post
const val_existance_post = async (req, res, next) => {
    const { post_id } = req.body;
    try {
        const post = await posts.findOne({ where: { id: post_id } });
        if (!post) {
            res.status(400).json({
                error: `A post with the id ${post_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existance_post = val_existance_post;
// Validate existant commnet
const val_existance_comment = async (req, res, next) => {
    const { comment_id } = req.body;
    try {
        const comment = await comments.findOne({ where: { id: comment_id } });
        if (!comment) {
            res.status(400).json({
                error: `A comment with the id ${comment_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existance_comment = val_existance_comment;
// Validate existant user
const val_existanceUser = async (req, res, next) => {
    const { user_id } = req.params;
    try {
        const user = await users.findOne({ where: { id: user_id } });
        if (!user) {
            res.status(400).json({
                error: `A user with the id ${user_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existanceUser = val_existanceUser;
// Validate existant post
const val_existance_postParams = async (req, res, next) => {
    const { post_id } = req.params;
    try {
        const post = await posts.findOne({ where: { id: post_id } });
        if (!post) {
            res.status(400).json({
                error: `A post with the id ${post_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existance_postParams = val_existance_postParams;
// Validate existant commnet
const val_existance_commentParams = async (req, res, next) => {
    const { comment_id } = req.params;
    try {
        const comment = await comments.findOne({ where: { id: comment_id } });
        if (!comment) {
            res.status(400).json({
                error: `A comment with the id ${comment_id} not exists!`,
                success: false,
            });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.val_existance_commentParams = val_existance_commentParams;
