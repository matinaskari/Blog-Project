const express = require("express");
const router = express.Router();
const {
  readBloggerDashboard,
  updateBloggerInfo,
  logoutBlogger,
  deleteBlogger,
} = require("../controllers/dashboard.controller");
//
const {
  readLoginPage,
  loginBlogger,
} = require("../controllers/login.controller");
//
const {
  readRegisterPage,
  registerBlogger,
} = require("../controllers/register.controller");
//
const {
  registerAdmin,
  readadminPanel,
  updatePasswordToPhonenumber
} = require("../controllers/admin.controller");
//
const {
  deleteAvatar
} = require("../controllers//avatar.controller");
//
const { bloggerValidator } = require("../middlewares/create.user.middleware");

//
const { adminChecker, loginChecker, CheckReqParamForDeleteBlogger } = require("../tools/sessionCheckers");



//////////////////////////////////////////////////////////


router.get("/Avatar/:id", loginChecker, deleteAvatar);

/////////////////////////////////////////////////////////

router.post("/createAdmin", registerAdmin);

router.patch("/updatePsw/:id",loginChecker, adminChecker, updatePasswordToPhonenumber);

router.get("/adminPanel",loginChecker, adminChecker, readadminPanel);

/////////////////////////////////////////////////////////

router.get("/register", readRegisterPage);

router.post("/register",bloggerValidator, registerBlogger);

/////////////////////////////////////////////////////////

router.get("/login", readLoginPage);

router.post("/login", loginBlogger);

/////////////////////////////////////////////////////////

router.get("/dashboard",loginChecker, readBloggerDashboard);

router.post("/dashboard", loginChecker, updateBloggerInfo);

router.get("/logout", loginChecker, logoutBlogger);

router.delete("/:id", loginChecker,CheckReqParamForDeleteBlogger, deleteBlogger);

/////////////////////////////////////////////////////////

module.exports = router;
