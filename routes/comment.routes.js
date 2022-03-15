const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
} = require("../controllers/comment.controller");

// checker tools
const { adminChecker, loginChecker } = require("../tools/sessionCheckers");

router.post("/comment", loginChecker, addComment);

router.delete("/comment/:id", adminChecker, deleteComment);

module.exports = router;
