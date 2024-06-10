const Product = require("../models/product");

exports.createComment = async (comment) => {
  return await Comment.create(comment);
};

exports.getAllComments = async () => {
  return await Comment.find();
};

exports.getCommentById = async (id) => {
  return await Comment.findById(id);
};

exports.updateComment = async (id, comment) => {
  return await Comment.findByIdAndUpdate(id, comment);
};

exports.deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

exports.repCommentTo = async (reply, parentComId) => {
  const parentComment = await Comment.findById(parentComId);
  if (!parentComment) {
    throw new Error("Parent comment not found");
  }

  const rep = await Comment.create(reply);
  rep.parentCommentId = parentComId;
  await rep.save();

  parentComment.replies.push(rep._id);
  await parentComment.save();
  return rep;
};
