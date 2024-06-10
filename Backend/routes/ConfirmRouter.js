const express = require("express");
const router = express.Router();
const { confirmEmail } = require("../controllers/ConfirmMailController");

router.get("/", confirmEmail);

module.exports = router;