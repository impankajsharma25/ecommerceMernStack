const express = require("express");
const { checkSchema } = require("express-validator");
const ErrorHandleHelper = require("../models/helpers/ErrorHandleHelper");
const userSchema = require("../schemaValidation/userValidation");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/userContoller");
const router = express.Router();

// router.route("/register")..post();
router.post(
  "/register",
  checkSchema(userSchema.register),
  ErrorHandleHelper.requestValidator,
  registerUser
);

router.post("/login", loginUser);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/logout", logout);

module.exports = router;
