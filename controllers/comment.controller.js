const { Comment } = require("../database/models/comment.model");

const addComment = async (req, res) => {
  try {
    await Comment.create({
      text: req.body.text,
      author: req.session.user._id,
      article: req.body.postId,
    });
    return res.redirect(302, `/Articles/${req.body.postId}`);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "something went wrong" });
  }
};

const deleteComment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .send({ success: false, msg: "id param is empty!" });
    }
    const targetComment = await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      msg: `comment with id ${req.params.id} deleted succesfully`,
      data: targetComment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, msg: "something went wrong" });
  }
};

module.exports = {
  addComment,
  deleteComment,
};
