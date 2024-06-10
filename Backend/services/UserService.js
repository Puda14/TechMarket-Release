const User = require("../models/user.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  const { name, email, password, phone, avatar, role, address } = user;

  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
    phone,
    avatar,
    emailConfirmed: true,
    customers: ["6631eca7cdb504839a6da6d1"],
    role,
    address,
  });

  return await newUser.save();
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
