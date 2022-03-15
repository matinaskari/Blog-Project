const multer = require("multer");
const path = require("path");
const {
  updateBloggerloggerValidator,
} = require("../middlewares/update.user.middleware");

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/avatars"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + "Avatar" + "_" + file.originalname);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: updateBloggerloggerValidator,
});

////////////////////////////////////////////////////////

const articleHeaderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/article headers"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + "ArticleHeader" + "_" + file.originalname);
  },
});

const uploadArticleHeader = multer({
  storage: articleHeaderStorage,
  fileFilter: function (req, file, cb) {
    // if (!req.body.title) {
    //     return cb('empty title', false)
    // }
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb("invalid type!", false);
    }
    cb(null, true);
  },
});

module.exports = {
  uploadAvatar,
  uploadArticleHeader,
};
