const loginChecker = (req, res, next) => {
  if (!req.session.user || !req.cookies.blogger_seed) {
    return res.redirect("/login");
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
  if (req.session.user.role !== "admin" && req.session.user._id !== req.params.id) {
    return res.status(403).send({msg:"Forbidden"})
  }
  next();
};

module.exports = {
  loginChecker,
  adminChecker,
  CheckReqParamForDeleteBlogger
};
