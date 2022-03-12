const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blog_project")
  .then(() => console.log("connected to DB successful"))
  .catch((err) => console.log(err));
