"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// Chain validators
const { validate_newUser, validate_loginUser, } = require("../middlewares/chain_validator");
// Validate results
const { validate_results } = require("../middlewares/validate_results");
// Validate existant objects
const { val_existanceUser_register, val_existanceUser_login, } = require("../middlewares/existence_validator");
// Validate token
const { validate_token } = require("../middlewares/validate_token");
// Controllers
const { register_user, login_user } = require("../controllers/controllers");
// Routes of the backend application //
// Register new user on application
router.post("/register", validate_newUser, validate_results, val_existanceUser_register, register_user);
// Log in to your account
router.post("/login", validate_loginUser, validate_results, val_existanceUser_login, login_user);
module.exports = router;
