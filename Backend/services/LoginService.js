const User = require("../models/user.js");

exports.loginUser = async (email) => {
    return await User.findOne({ email });
};