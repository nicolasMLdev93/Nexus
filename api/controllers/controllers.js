"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_commentLikes = exports.get_postLikes = exports.get_postComments = exports.get_userPosts = exports.create_repost = exports.like_comment = exports.create_comment = exports.like_post = exports.create_post = exports.login_user = exports.register_user = void 0;
const { users, posts, post_likes, comments, comment_likes, repost, } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register new user
const register_user = async (req, res) => {
    const { email, password, name, surname, role } = req.body;
    try {
        const saltRounds = 12;
        const hash = bcrypt.hashSync(password, saltRounds);
        await users.create({
            email: email,
            password: hash,
            name: name,
            surname: surname,
            isActive: true,
            role: role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res
            .status(200)
            .json({ message: "User successfully registered", success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.register_user = register_user;
// Login
const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user_result = await users.findOne({ where: { email: email } });
        const hash_password = user_result.password;
        const checked_password = bcrypt.compare(password, hash_password);
        if (!checked_password) {
            res
                .status(500)
                .json({ error: "Your password is not valid!", success: false });
            return;
        }
        else {
            const token = jwt.sign({
                data: user_result.id,
            }, process.env.JWT_SECRET);
            res.status(200).json({
                message: `Welcome ${user_result.name}`,
                token: token,
                success: true,
                user: {
                    id: user_result.id,
                    email: user_result.email,
                    role: user_result.role,
                },
            });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.login_user = login_user;
// Create new post
const create_post = async (req, res) => {
    const { content, user_id } = req.body;
    try {
        await posts.create({
            content: content,
            user_id: user_id,
            likes_count: 0,
            isPublic: true,
            rePost_count: 0,
        });
        res
            .status(200)
            .json({ message: `User ${user_id} created a new post!`, success: true });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.create_post = create_post;
// Give a like to a post
const like_post = async (req, res) => {
    const { post_id, user_id } = req.body;
    try {
        await posts.increment("likes_count", { where: { id: post_id } });
        await post_likes.create({
            post_id: post_id,
            user_id: user_id,
        });
        res.status(200).json({
            message: `User ${user_id} liked the post ${post_id}!`,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.like_post = like_post;
// Create new comment
const create_comment = async (req, res) => {
    const { content, user_id, post_id } = req.body;
    try {
        await comments.create({
            content: content,
            user_id: user_id,
            post_id: post_id,
            likes_count: 0,
        });
        res.status(200).json({
            message: `User ${user_id} commented a the post ${post_id}!`,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.create_comment = create_comment;
// Give a like to a commnet
const like_comment = async (req, res) => {
    const { comment_id, user_id } = req.body;
    try {
        await comments.increment("likes_count", {
            where: { id: comment_id },
        });
        await comment_likes.create({
            comment_id: comment_id,
            user_id: user_id,
        });
        res.status(200).json({
            message: `User ${user_id} liked the comment ${comment_id}!`,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.like_comment = like_comment;
// Give a repost
const create_repost = async (req, res) => {
    const { post_id, user_id } = req.body;
    try {
        await posts.increment("rePost_count", { where: { id: post_id } });
        await repost.create({
            post_id: post_id,
            user_id: user_id,
        });
        res.status(200).json({
            message: `User ${user_id} repost the post ${post_id}!`,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.create_repost = create_repost;
// Get all post by user_id
const get_userPosts = async (req, res) => {
    const { user_id } = req.params;
    try {
        const user_posts = await posts.findAll({ where: { user_id: user_id } });
        if (user_posts.length === 0) {
            res.status(200).json({
                message: `The user ${user_id} dont have posts yet!`,
                success: true,
            });
        }
        res.status(200).json({
            posts: user_posts,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_userPosts = get_userPosts;
// Get all comments by post_id
const get_postComments = async (req, res) => {
    const { post_id } = req.params;
    try {
        const comment_posts = await comments.findAll({
            where: { post_id: post_id },
        });
        if (comment_posts.length === 0) {
            res.status(200).json({
                message: `The post ${post_id} dont have comments yet!`,
                success: true,
            });
        }
        res.status(200).json({
            comments: comment_posts,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_postComments = get_postComments;
// Get all likes by post_id
const get_postLikes = async (req, res) => {
    const { post_id } = req.params;
    try {
        const like_posts = await post_likes.findAll({
            where: { post_id: post_id },
        });
        if (like_posts.length === 0) {
            res.status(200).json({
                message: `The post ${post_id} dont have likes yet!`,
                success: true,
            });
        }
        res.status(200).json({
            likes: like_posts,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_postLikes = get_postLikes;
// Get all likes by comment_id
const get_commentLikes = async (req, res) => {
    const { comment_id } = req.params;
    try {
        const like_c = await comment_likes.findAll({
            where: { comment_id: comment_id },
        });
        if (like_c.length === 0) {
            res.status(200).json({
                message: `The comment ${comment_id} dont have likes yet!`,
                success: true,
            });
        }
        res.status(200).json({
            likes: like_c,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", success: false, error: error });
    }
};
exports.get_commentLikes = get_commentLikes;
