const express = require("express");
const { loginUser } = require("../controllers/LoginController");

const router = express.Router();

router.post("/", loginUser);

module.exports = router;
