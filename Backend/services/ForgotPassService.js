const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendForgotPasswordEmail } = require("../utils/mailserver");

function generateRandomPassword() {
  return crypto.randomBytes(8).toString("hex");
}

exports.createNewPass = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const newPassword = generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;

    await user.save();

    sendForgotPasswordEmail(email, newPassword);

    return user;
  } catch (error) {
    throw error;
  }
};
