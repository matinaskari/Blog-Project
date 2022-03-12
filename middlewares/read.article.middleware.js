const { Article } = require("../database/models/article.model");

const existArticleValidator = async (req, res, next) => {
  // check if Article Param exist

  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).render("404", {
        msg: "Article Not Found",
      });
    }
  } catch (error) {
    return res.status(500).send({ msg: "some thing went wrong" });
  }

  next();
};

module.exports = { existArticleValidator };
