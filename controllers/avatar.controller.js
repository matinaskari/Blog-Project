const { User } = require("../database/models/user.model");
const fs = require("fs");
const path = require("path");


const deleteAvatar = function (req, res) {
  User.findByIdAndUpdate(
    req.session.user._id,
    { avatar: "no" },
    function (err, user) {
      if (err) {
        console.log("this is error", err);
        return res.status(400).json({ msg: "err" });
      }

      if (req.session.user.avatar !== "no") {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../public/uploads/avatars",
            req.session.user.avatar
          )
        );
        req.session.user.avatar = "no";
      }


      res.redirect(302,"/dashboard");
    }
  );
};

module.exports = {
  deleteAvatar,
};
