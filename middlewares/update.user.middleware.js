const { User } = require("../database/models/user.model");
const updateBloggerloggerValidator = async (req, file, cb) => {
  console.log(1);
  const { firstName, lastName, gender, phoneNumber, username } = req.body;
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !gender?.trim() ||
    !phoneNumber?.trim() ||
    !username?.trim()
  ) {
    return cb({ msg: "Invalid inputs", status: 400 }, false);
  }

  if (firstName.length < 3) {
    return cb(
      { msg: "name length must be greater than 3", status: 400 },
      false
    );
  }
  if (lastName.length < 2) {
    return cb(
      { msg: "family length must be grater than 2", status: 400 },
      false
    );
  }

  const blogger = await User.findOne({ username: username });

  if (blogger && blogger.username !== req.session.user.username) {
    return cb({ msg: "username already exists", status: 409 }, false);
  }

  const bloggerMobile = await User.findOne({ phoneNumber: phoneNumber });

  if (
    bloggerMobile &&
    bloggerMobile.phoneNumber !== req.session.user.phoneNumber
  ) {
    return cb({ msg: "mobile must be unique", status: 409 }, false);
  }

  if (
    !phoneNumber.match(
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/
    )
  ) {
    return cb({ msg: "Invalid phoneNumber number!", status: 400 }, false);
  }
  if (gender !== "male" && gender !== "female") {
    return cb({ msg: "gender is only male or female", status: 400 }, false);
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return cb({ msg: "invalid type!", status: 406 }, false);
  }
  cb(null, true);
};

const bloggervaliadatortest = (req, res) => {
  console.log(req.body);
  // return res.redirect("/dashboard")
};

module.exports = { updateBloggerloggerValidator, bloggervaliadatortest };
