import { Request, Response } from "express";
const { users } = require("../../models");
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
        return
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
