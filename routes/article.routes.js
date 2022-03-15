const express = require("express");
const router = express.Router();

//
const {
  readMyArticles,
  createArticle,
  readAllArticles,
  readOneArticle,
  deleteArticle,
  readEditArticle,
  updateArticle,
} = require("../controllers/article.controller");
//
const {
  existArticleValidator,
} = require("../middlewares/read.article.middleware");

//
const { adminChecker, loginChecker } = require("../tools/sessionCheckers");

router.get("/profile", loginChecker, readMyArticles);

router.get("/Articles", loginChecker, readAllArticles);

router.get("/Articles/:id", loginChecker, existArticleValidator, readOneArticle);

router.delete("/Articles/:id", loginChecker, existArticleValidator, deleteArticle);

router.post("/createArticle", loginChecker, createArticle);

router.get("/editArticle/:id", loginChecker, existArticleValidator, readEditArticle);

router.post("/editArticle", loginChecker, updateArticle);

module.exports = router;
