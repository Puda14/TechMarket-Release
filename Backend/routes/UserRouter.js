const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getCartByUser,
  updateUserCart,
  deleteUserCart,
} = require("../controllers/UserController.js");
const { isManager, isCustomer } = require("../middleware/auth.js");

const router = express.Router();
router.route("/").get(isManager, getAllUsers).post(isManager, createUser);
router
  .route("/:id")
  .get(isCustomer, getUserById)
  .put(isCustomer, updateUser)
  .delete(isManager, deleteUser);
router.route("/:id/cart").get(getCartByUser);
router.route("/:userId/cart/:productId").post(updateUserCart);
router.route("/:userId/cart").post(deleteUserCart);
module.exports = router;
