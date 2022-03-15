const { User } = require("../database/models/user.model");

const loginChecker = async (req, res, next) => {
  if (!req.session.user || !req.cookies.blogger_seed) {
    return res.redirect("/login");
  } else {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      req.session.destroy();
      res.clearCookie("blogger_seed");
      return res.redirect(302, "/"); 
    }
  }
  next();
};

const adminChecker = (req, res, next) => {
  if (req.session.user.role !== "admin") {
    return res.redirect("/dashboard");
  }
  next();
};

const CheckReqParamForDeleteBlogger = (req, res, next) => {
  if (
    req.session.user.role !== "admin" &&
    req.session.user._id !== req.params.id
  ) {
    return res.status(403).send({ msg: "Forbidden" });
  }
  next();
};

module.exports = {
  loginChecker,
  adminChecker,
  CheckReqParamForDeleteBlogger,
};
