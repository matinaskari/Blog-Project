const { User } = require("../database/models/user.model");
const { Article } = require("../database/models/article.model");
const { Comment } = require("../database/models/comment.model");
const { uploadAvatar } = require("../tools/uploadTools");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const {
  bloggervaliadatortest,
} = require("../middlewares/update.user.middleware");

const readBloggerDashboard = (req, res) => {
  if (req.session.user && req.cookies.blogger_seed) {
    const user = req.session.user;
    res.status(200).render("dashboard", { user, msg: null });
  } else {
    res.redirect(302, "/login");
  }
};

const updateBloggerInfo = async (req, res) => {
  const upload = uploadAvatar.single("avatar");

  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.redirect(302, "/dashboard");
    }

    try {
      if (req.file) {
        const thisUser = await User.findById(req.session.user._id);
        if (thisUser.avatar !== "no") {
          fs.unlinkSync(
            path.join(__dirname, "../public/uploads/avatars", thisUser.avatar)
          );
        }
        const newUser = await User.findByIdAndUpdate(
          req.session.user._id,
          {
            avatar: req.file.filename,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phone,
            gender: req.body.gender,
          },
          { new: true }
        );
        req.session.user = newUser;
        return res.redirect(302, "/dashboard");
      } else {
        bloggervaliadatortest(req, res);
        const newUser = await User.findByIdAndUpdate(
          req.session.user._id,
          {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phone,
            gender: req.body.gender,
          },
          { new: true }
        );
        req.session.user = newUser;
        return res.redirect(302, "/dashboard");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ msg: "something went wrong" });
    }
  });
};

const logoutBlogger = (req, res) => {
  req.session.destroy();
  res.clearCookie("blogger_seed");
  res.redirect(302, "/");
};

const deleteBlogger = async function (req, res) {
  try {
    if (!req.params.id) {
      return res.status(400).send({ msg: "id param is empty!" });
    }
    const targetUser = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    const bloggerArticles = await Article.find({ author: req.params.id });
    bloggerArticles.forEach(function (article) {
      fs.unlinkSync(
        path.join(
          __dirname,
          "../public/uploads/article headers",
          article.articleHeader
        )
      );
      Comment.deleteMany({ article: article._id })
        .then(function () {
          console.log("comments deleted"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    });
    await Article.deleteMany({ author: req.params.id });
    await Comment.deleteMany({ author: req.params.id });
    if (targetUser.avatar !== "no") {
      fs.unlinkSync(
        path.join(__dirname, "../public/uploads/avatars", targetUser.avatar)
      );
    }
    if (req.session.user.role !== "admin") {
      req.session.destroy();
      res.clearCookie("blogger_seed");
    }

    res.status(200).send({ msg: "user deleted succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = {
  readBloggerDashboard,
  updateBloggerInfo,
  logoutBlogger,
  deleteBlogger,
};
