const commentService = require("../services/CommentService");

exports.createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.json({ data: comment, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.json({ data: comment, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comment = await commentService.getAllComments();
    res.json({ data: comment, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);
    res.json({ data: comment, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    res.json({ data: comment, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.repComment = async (req, res) => {
  try {
    const { replyTo } = req.query;
    const reply = await commentService.repCommentTo(req.body, replyTo);
    res.json({ data: reply, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
