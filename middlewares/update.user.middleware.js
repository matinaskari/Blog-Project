const { User } = require("../database/models/user.model");
const updateBloggerloggerValidator =async (req, res, next) => {
  const { firstName, lastName, gender, phoneNumber, username} = req.body;
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !gender?.trim() ||
    !phoneNumber?.trim() ||
    !username?.trim()
  ) {
    return res.status(400).send({ msg: "Invalid inputs" });
  }
  //

  if (firstName.length < 3) {
    return res.status(400).send({ msg: "name length must be greater then 3" });
  }
  if (lastName.length < 2) {
    return res.status(400).send({ msg: "family must be grater than 2" });
  }
  
  const blogger = await User.findOne({ username: username });


    if (blogger && blogger.username !== req.session.user.username) {
      const user = req.session.user;
      return res.status(409).render("dashboard", { user, msg: "username already exists" });
      
    }

  
  const bloggerMobile = await User.findOne({ phoneNumber: phoneNumber });

  if (bloggerMobile && bloggerMobile.phoneNumber !== req.session.user.phoneNumber ) {
    return res.status(400).send({ msg: "mobile must be unique" });
  }

  if (
    !phoneNumber.match(
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/
    )
  ) {
    return res.status(400).send({msg: "Invalid phoneNumber number!"});
  }
  if (gender !== "male" && gender !=="female" ) {
    return res.status(400).send({ msg: "gender is only male or female" });
  }

  next();
};

module.exports = { updateBloggerloggerValidator };
