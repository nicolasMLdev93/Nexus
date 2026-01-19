import { Request, Response, NextFunction } from "express";
const { User } = require("../../models");

// Validate existance user
export const val_existanceUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res
        .status(400)
        .json({  error: `A user with the email ${email} already exists.`,, success: false });
        return
    } else {
      next();
    }
  } catch (error) {
    console.error("Validation middleware error:", error);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};
