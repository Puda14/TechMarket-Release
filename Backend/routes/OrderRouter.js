const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderStats,
  getIncomeStats,
  getOneWeekSales,
  getOrderByUserId,
} = require("../controllers/OrderController");
const { isEmployee, isManager, isCustomer } = require("../middleware/auth");
const { checkOrderAccess } = require("../middleware/AccessOrder");

router.route("/").get(isEmployee, getAllOrders).post(createOrder);

//GET ORDERS STATS
router.get("/stats", isManager, getOrderStats);

//GET INCOME STATS
router.get("/income/stats", isManager, getIncomeStats);

//GET 1 WEEK SALES
router.get("/week-sales", isManager, getOneWeekSales);

//GET USER ORDERS
router.get("/find/:userId", getOrderByUserId);

router
  .route("/:id")
  .get(isEmployee, getOrderById)
  .put(checkOrderAccess, updateOrder)
  .delete(isEmployee, deleteOrder);

module.exports = router;
