const express = require("express");
const User = require("../models/user");

exports.confirmEmail = async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({
    confirmationToken: token,
    confirmationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send("Token is invalid or has expired.");
  }

  user.emailConfirmed = true;
  user.confirmationToken = undefined;
  user.confirmationExpires = undefined;
  await user.save();

  res.redirect("http://localhost:5173/confirmemail");
};
