import { Request, Response, NextFunction } from "express";
const { users } = require("../../models");

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
