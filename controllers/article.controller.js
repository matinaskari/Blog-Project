const { Article } = require("../database/models/article.model");
const { Comment } = require("../database/models/comment.model");
const { uploadArticleHeader } = require("../tools/uploadTools");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

//update article
const updateArticle = (req, res) => {
  const upload = uploadArticleHeader.single("articleHeader");

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.redirect(302, "/dashboard");
    }

    try {
      if (req.file) {
        const thisArticle = await Article.findById(req.body.postId);
        if (thisArticle.articleHeader) {
          fs.unlinkSync(
            path.join(
              __dirname,
              "../public/uploads/article headers",
              thisArticle.articleHeader
            )
          );
        }
        const targetArticle = await Article.findByIdAndUpdate(
          req.body.postId,
          {
            articleHeader: req.file.filename,
            title: req.body.title,
            text: req.body.text,
            author: req.session.user._id,
          },
          { new: true }
        );

        return res.redirect(302, `/Articles/${req.body.postId}`);
      } else {
        const targetArticle = await Article.findByIdAndUpdate(
          req.body.postId,
          {
            title: req.body.title,
            text: req.body.text,
            author: req.session.user._id,
          },
          { new: true }
        );
        return res.redirect(302, `/Articles/${req.body.postId}`);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "something went wrong" });
    }
  });
};
//
// create article
const createArticle = (req, res) => {
  const upload = uploadArticleHeader.single("articleHeader");

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.redirect(302, "/dashboard");
    }

    try {
      Article.create({
        articleHeader: req.file.filename,
        title: req.body.title,
        text: req.body.text,
        author: req.session.user._id,
      });
      return res.redirect(302, "/myArticles");
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "something went wrong" });
    }
  });
};

// get requests

const readMyArticles = async (req, res) => {
  const myArticles = await Article.find({ author: req.session.user._id });
  const user = req.session.user;

  res.render("user-profile", {
    myArticles: myArticles,
    user: req.session.user,
    joinDate: new Date(user.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    msg: null,
  });
};

const readAllArticles = async (req, res) => {
  const allArticles = await Article.find({})
    .sort({ createdAt: -1 })
    .select(" -__v")
    .populate("author", " -__v -password -role -phoneNumber -gender");

  res.render("allArticles", {
    allArticles: allArticles,
    user: req.session.user,
  });
};

const readOneArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .select(" -__v")
      .populate("author", " -__v -password -role -phoneNumber -gender");
    // res.send({article})
    const comments = await Comment.find({ article: req.params.id }).populate(
      "author",
      " -__v -password -role -phoneNumber -gender"
    );
    // res.send({ comments });
    return res.status(200).render("article", {
      article: article,
      comments: comments,
      user: req.session.user,
    });
  } catch (error) {
    return res.status(500).send({msg:"some thing went wrong"})
  }
};

const readEditArticle = async (req, res) => {
  const article = await Article.findById(req.params.id)
    .select(" -__v")
    .populate("author", " -__v -password -role -phoneNumber -gender");
  // res.send({article})
  res.status(200).render("edit-article", {
    article: article,
    user: req.session.user,
    msg: null,
  });
};

const deleteArticle = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ msg: "id param is empty!" });
    }
    await Comment.deleteMany({ article: req.params.id });
    const article = await Article.findByIdAndDelete(req.params.id);
    fs.unlinkSync(
      path.join(
        __dirname,
        "../public/uploads/article headers",
        article.articleHeader
      )
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = {
  createArticle,
  readMyArticles,
  readAllArticles,
  readOneArticle,
  deleteArticle,
  readEditArticle,
  updateArticle,
};
