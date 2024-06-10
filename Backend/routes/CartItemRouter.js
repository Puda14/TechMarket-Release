const express = require("express");
const router = express.Router();
const { createItem } = require("../controllers/CartItemController");

router.route("/").post(createItem);

module.exports = router;
