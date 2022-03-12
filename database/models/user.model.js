const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first name minimum length is 3 chars"],
      maxlength: [50, "first name maximum length is 50 chars"],
    },
    lastName: {
      type: String,
      required: true,
      minlength: [3, "first name minimum length is 3 chars"],
      maxlength: [50, "first name maximum length is 50 chars"],
    },
    username: {
      type: String,
      required: true,
      trim: true, //because the client can't use space for username firstName and lastName
      minLength: [3, "username must be at more 4 characters"],
      maxLength: [30, "username must be at less 30 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password must be at least 8 characters"],
      maxLength: [14, "password cannot be more than 14 characters"],
    },
    role: {
      type: String,
      required: true,
      default: "blogger",
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    avatar: {
      type: String,
      default: "no",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  // console.log('pre save');

  let blogger = this._doc;
  if (this.isNew || this.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(blogger.password, salt, function (err, hash) {
        if (err) return next(err);

        blogger.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.post("save", function (doc, next) {
  // console.log('post save');

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
