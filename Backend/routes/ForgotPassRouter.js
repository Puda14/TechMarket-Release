const express = require("express");
const { forgotPassword } = require("../controllers/ForgotPassController");

const router = express.Router();
router.route("/").post(forgotPassword);
module.exports = router;
