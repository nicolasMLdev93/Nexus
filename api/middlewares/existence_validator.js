"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.val_existanceUser_login = exports.val_existanceUser_register = void 0;
const { users } = require("../../models");
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
