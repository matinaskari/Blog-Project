const express = require("express");
const router = express.Router();

const {
  readLoginPage,
  loginBlogger,
} = require("../controllers/login.controller");

const {
  readRegisterPage,
  registerBlogger,
} = require("../controllers/register.controller");

const { bloggerValidator } = require("../middlewares/create.user.middleware");

router.get("/login", readLoginPage);

router.post("/login", loginBlogger);

router.get("/register", readRegisterPage);

router.post("/register", bloggerValidator, registerBlogger);

module.exports = router;
