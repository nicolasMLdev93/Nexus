const express = require("express");
const router = express.Router();

// Chain validators
const { validate_newUser } = require("../middlewares/chain_validator");
// Validate results
const { validate_results } = require("../middlewares/validate_results");
// Validate existant objects
const { val_existanceUser } = require("../middlewares/existence_validator");
// Controllers
const { register_user } = require("../controllers/controllers");
// Routes of the backend application //
// Register new user on application
router.post(
  "/register",
  validate_newUser,
  validate_results,
  val_existanceUser,
  register_user
);

module.exports = router;
export {};
