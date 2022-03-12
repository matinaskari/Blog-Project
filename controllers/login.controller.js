const { User } = require("../database/models/user.model");
const bcrypt = require("bcryptjs");

const loginBlogger = (req, res) => {
  if (!req.body.u_name || !req.body.psw) {
    return res.status(406).render("login", { msg: "Not Acceptable" });
  }

  User.findOne({ username: req.body.u_name }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).render("login", { msg: "Somthing went wrong" });
    }
    if (!user) {
      return res
        .status(403)
        .render("login", { msg: "Wrong username or password" });
    }

    bcrypt.compare(req.body.psw, user.password, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).render("login", { msg: "Somthing went wrong" });
      }

      if (!result) {
        return res
          .status(403)
          .render("login", { msg: "Wrong username or password" });
      }

      req.session.user = user;

      return res.redirect(302, "/Articles");
    });
  });
};

const readLoginPage = (req, res) => {
  if (req.session.user && req.cookies.blogger_seed) {
    if (req.session.user.role === "admin") {
      res.redirect(302,"/adminPanel");
    } else {
      res.redirect(302,"/Articles");
    }
  } else {
    res.render("login", { msg: null });
  }
};

module.exports = {
  loginBlogger,
  readLoginPage,
};
