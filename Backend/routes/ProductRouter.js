const express = require("express");
const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllComments,
  createComment,
  reply,
} = require("../controllers/ProductController.js");
const { isEmployee } = require("../middleware/auth.js");
const router = express.Router();

router.route("/").get(getAllProducts).post(isEmployee, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(isEmployee, updateProduct)
  .delete(isEmployee, deleteProduct);
router.route("/:productId/comment").post(createComment).get(getAllComments);
router.route("/:productId/comment/:commentId").post(reply);
module.exports = router;
