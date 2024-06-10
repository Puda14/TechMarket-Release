const userService = require("../services/UserService");
const forgotPassService = require("../services/ForgotPassService");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await forgotPassService.createNewPass(email);

    if (!user) {
      res.status(400).send("Invalid email");
    }

    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
