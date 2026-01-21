import { Request, Response, NextFunction } from "express";
const { users, posts, comments,repost } = require("../../models");

// Validate existance user for register
export const val_existanceUser_register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await users.findOne({ where: { email: email } });
    if (user) {
      res.status(400).json({
        error: `A user with the email ${email} already exists.`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existance user for login
export const val_existanceUser_login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  try {
    const user = await users.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).json({
        error: `A user with the email ${email} not exists; try with other email`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant user
export const val_existanceUser_post = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user_id } = req.body;
  try {
    const user = await users.findOne({ where: { id: user_id } });
    if (!user) {
      res.status(400).json({
        error: `A user with the id ${user_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant post
export const val_existance_post = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { post_id } = req.body;
  try {
    const post = await posts.findOne({ where: { id: post_id } });
    if (!post) {
      res.status(400).json({
        error: `A post with the id ${post_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant commnet
export const val_existance_comment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { comment_id } = req.body;
  try {
    const comment = await comments.findOne({ where: { id: comment_id } });
    if (!comment) {
      res.status(400).json({
        error: `A comment with the id ${comment_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant user
export const val_existanceUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user_id } = req.params;
  try {
    const user = await users.findOne({ where: { id: user_id } });
    if (!user) {
      res.status(400).json({
        error: `A user with the id ${user_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant post
export const val_existance_postParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { post_id } = req.params;
  try {
    const post = await posts.findOne({ where: { id: post_id } });
    if (!post) {
      res.status(400).json({
        error: `A post with the id ${post_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant comment
export const val_existance_commentParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { comment_id } = req.params;
  try {
    const comment = await comments.findOne({ where: { id: comment_id } });
    if (!comment) {
      res.status(400).json({
        error: `A comment with the id ${comment_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};

// Validate existant re-post
export const val_existance_repostParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { post_id } = req.params;
  try {
    const repost_res = await repost.findOne({ where: { id: post_id } });
    if (!repost_res) {
      res.status(400).json({
        error: `A repost with post-id ${post_id} not exists!`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", success: false, error: error });
  }
};