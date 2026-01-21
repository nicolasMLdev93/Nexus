import { Request, Response } from "express";
const {
  users,
  posts,
  post_likes,
  comments,
  comment_likes,
  repost,
} = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register new user
export const register_user = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password, name, surname, role } = req.body;
  try {
    const saltRounds: number = 12;
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Login
export const login_user = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user_result = await users.findOne({ where: { email: email } });
    const hash_password = user_result.password;
    const checked_password: boolean = bcrypt.compare(password, hash_password);
    if (!checked_password) {
      res
        .status(500)
        .json({ error: "Your password is not valid!", success: false });
      return;
    } else {
      const token = jwt.sign(
        {
          data: user_result.id,
        },
        process.env.JWT_SECRET,
      );
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Create new post
export const create_post = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Give a like to a post
export const like_post = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Create new comment
export const create_comment = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Give a like to a commnet
export const like_comment = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Give a repost
export const create_repost = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Get all post by user_id
export const get_userPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Get all comments by post_id
export const get_postComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Get all likes by post_id
export const get_postLikes = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Get all likes by comment_id
export const get_commentLikes = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Get all reposts by user
export const get_userReposts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { user_id } = req.params;
  try {
    const reposts = await repost.findAll({
      where: { user_id: user_id },
    });
    if (reposts.length === 0) {
      res.status(200).json({
        message: `The user ${user_id} dont have reposts yet!`,
        success: true,
      });
    }
    res.status(200).json({
      reposts: reposts,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Unlike post
export const unlike_post = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { post_id, user_id } = req.body;
  try {
    await posts.decrement("likes_count", { where: { id: post_id } });
    await post_likes.destroy({
      where: {
        id: user_id,
      },
    });
    res.status(200).json({
      message: `The post ${post_id} has been unliked!`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Unlike comment
export const unlike_comment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { comment_id, user_id } = req.body;
  try {
    await comments.decrement("likes_count", { where: { id: comment_id } });
    await comment_likes.destroy({
      where: {
        id: user_id,
      },
    });
    res.status(200).json({
      message: `The comment ${comment_id} has been unliked!`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Delete comment
export const delete_comment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { comment_id } = req.body;
  try {
    await comment_likes.destroy({
      where: {
        comment_id: comment_id,
      },
    });
    await comments.destroy({
      where: {
        id: comment_id,
      },
    });
    res.status(200).json({
      message: `The comment ${comment_id} has been deleted!`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Delete re-post
export const delete_repost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { post_id } = req.body;
  try {
    await repost.destroy({
      where: {
        post_id: post_id,
      },
    });
    res.status(200).json({
      message: `The re-post of post ${post_id} has been deleted!`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Delete post
export const delete_post = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { post_id } = req.body;
  try {
    await repost.destroy({
      where: {
        post_id: post_id,
      },
    });
    const id_comment = await comments.findOne({
      where: {
        post_id: post_id,
      },
    });
    await comment_likes.destroy({
      where: {
        comment_id: id_comment.id,
      },
    });
    await comments.destroy({
      where: {
        post_id: post_id,
      },
    });
    await post_likes.destroy({
      where: {
        post_id: post_id,
      },
    });
    await posts.destroy({
      where: {
        id: post_id,
      },
    });
    res.status(200).json({
      message: `The post ${post_id} has been deleted!`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};
