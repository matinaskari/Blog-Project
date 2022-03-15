const express = require("express");
const router = express.Router();

const {
  readBloggerDashboard,
  updateBloggerInfo,
  logoutBlogger,
  deleteBlogger,
} = require("../controllers/dashboard.controller");

const {
  loginChecker,
  CheckReqParamForDeleteBlogger,
} = require("../tools/sessionCheckers");

const { deleteAvatar } = require("../controllers//avatar.controller");

router.get("/dashboard", loginChecker, readBloggerDashboard);

router.post("/dashboard", loginChecker, updateBloggerInfo);

router.get("/Avatar/:id", loginChecker, deleteAvatar);

router.get("/logout", loginChecker, logoutBlogger);

router.delete(
  "/:id",
  loginChecker,
  CheckReqParamForDeleteBlogger,
  deleteBlogger
);

module.exports = router;
