const { Article } = require("../database/models/article.model");
const articleValidator = async (req, res, next) => {
  const {} = req.body;
  if (
    !title?.trim() 

  ) {
    return res.status(400).send({ msg: "Invalid inputs" });
  }
  //
  if (f_name.length < 3) {
    return res.status(400).send({ msg: "name length must be greater then 3" });
  }
  if (l_name.length < 2) {
    return res.status(400).send({ msg: "family must be grater than 2" });
  }
  //
  const article = await Article.findOne({ title: title });

  if (article) {
    return res.status(400).send({ msg: "title must be unique" });
  }
  //


  next();
};

module.exports = { articleValidator };