const { User } = require("../database/models/user.model");

const registerBlogger = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      await User.create({
        username: req.body.u_name,
        password: req.body.psw,
        firstName: req.body.f_name,
        lastName: req.body.l_name,
        phoneNumber: req.body.phone,
        gender: req.body.gender,
        role:"blogger",
      });
      res.redirect(302,"/login");
    } else {
      res.send("failed");
    }
  } catch (error) {
    return res.status(500).send({ msg: "something went wrong" });
  }
};

const readRegisterPage = (req, res) => {
  if (req.session.user && req.cookies.blogger_seed) {
    if (req.session.user.role === "admin") {
        res.redirect(302,"/adminPanel");
    } else {
        res.redirect(302,"/Articles");
    }
} else {
    res.render("register", { msg: null });
  }
};

module.exports = {
  registerBlogger,
  readRegisterPage,
};
