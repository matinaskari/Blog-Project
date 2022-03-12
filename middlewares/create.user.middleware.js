const { User } = require("../database/models/user.model");
const bloggerValidator = async (req, res, next) => {
  const { f_name, l_name, gender, phone, u_name, psw } = req.body;
  if (
    !f_name?.trim() ||
    !l_name?.trim() ||
    !gender?.trim() ||
    !phone?.trim() ||
    !u_name?.trim() ||
    !psw
  ) {
    return res.status(400).send({ msg: "Invalid inputs" });
  }
  //
  if (f_name.length < 3) {
    return res
      .status(400)
      .send({ msg: "first name length must be greater then 3" });
  }
  if (l_name.length < 2) {
    return res.status(400).send({ msg: "last name must be grater than 2" });
  }
  // check if blogger username is unique
  try {
    const blogger = await User.findOne({ username: u_name });
    if (blogger) {
      return res
        .status(409)
        .render("register", { msg: "username already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).render("register", { msg: "Somthing went wrong" });
  }

  // check if blogger mobile number is unique
  try {
    const bloggerMobile = await User.findOne({ phoneNumber: phone });

    if (bloggerMobile) {
      return res
        .status(409)
        .render("register", { msg: "mobile must be unique" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).render("register", { msg: "Somthing went wrong" });
  }

  if (
    !phone.match(
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/
    )
  ) {
    return res.status(400).send({ msg: "Invalid phone number!" });
  }

  next();
};

module.exports = { bloggerValidator };
