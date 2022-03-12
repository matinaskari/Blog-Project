const res = require("express/lib/response");
const { User } = require("../database/models/user.model");
const { Article } = require("../database/models/article.model");
const { Comment } = require("../database/models/comment.model");
const bcrypt = require("bcryptjs");

const readadminPanel = async (req, res) => {
  if (
    req.session.user &&
    req.cookies.blogger_seed &&
    req.session.user.role === "admin"
  ) {
    const user = req.session.user;
    const bloggers = await User.find({ role: "blogger" });
    const admins = await User.find({ role: "admin" });
    const comments = await Comment.find({}).populate("author", " -__v -password -role -phoneNumber -gender");
    const articles = await Article.find({}).populate("author", " -__v -password -role -phoneNumber -gender");
    res
      .status(200)
      .render("adminPanel", { bloggers, admins, user, comments, articles });
  } else {
    res.redirect(302, "/login");
  }
};

const registerAdmin = async (req, res) => {
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
        role: req.body.role,
      });

      return res.status(200).send({
        msg: `${req.body.f_name} ${req.body.l_name} with username ${req.body.u_name} created succesfully as admin`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "something went wrong" });
  }
};

const updatePasswordToPhonenumber = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.phoneNumber, salt, async (err, hash) => {
        if (err) return console.log(err);

        const hashedPhoneNumber = hash;

        const targetUser = await User.findByIdAndUpdate(
          req.params.id,
          { password: hashedPhoneNumber },
          { new: true }
        );
        console.log(
          `user ${targetUser.username}'s password changed to his/her phone number.`
        );
      });
    });
    return res.end();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "something went wrong" });
  }
};

module.exports = {
  registerAdmin,
  readadminPanel,
  updatePasswordToPhonenumber,
};
