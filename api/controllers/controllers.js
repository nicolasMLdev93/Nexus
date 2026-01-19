"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register_user = void 0;
const { User } = require("../../models");
const bcrypt = require("bcrypt");
// Register new user
const register_user = async (req, res) => {
    const { email, password, name, surname, role } = req.body;
    try {
        const saltRounds = 12;
        const hash = bcrypt.hashSync(password, saltRounds);
        await User.create({
            email: email,
            password: hash,
            name: name,
            surname: surname,
            isActive: true,
            role: role,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    catch (error) {
        console.error("Validation middleware error:", error);
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};
exports.register_user = register_user;
