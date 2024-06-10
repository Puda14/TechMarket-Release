const express = require("express");
const router = express.Router();
const { createComment, getCommentById, getAllComments, updateComment, deleteComment, repComment} = require("../controllers/CommentController");
const { route } = require("./ConfirmRouter");

router.route("/").get(getAllComments).post(createComment);
router.route("/:id").get(getCommentById).put(updateComment).delete(deleteComment);
router.route("/reply").post(repComment);

module.exports = router;
