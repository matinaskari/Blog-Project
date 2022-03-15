const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  readadminPanel,
  updatePasswordToPhonenumber,
} = require("../controllers/admin.controller");

const { adminChecker, loginChecker } = require("../tools/sessionCheckers");

router.post("/createAdmin", registerAdmin);

router.patch(
  "/updatePsw/:id",
  loginChecker,
  adminChecker,
  updatePasswordToPhonenumber
);

router.get("/admin-panel", loginChecker, adminChecker, readadminPanel);

module.exports = router;
