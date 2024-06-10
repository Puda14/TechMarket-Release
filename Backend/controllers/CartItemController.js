const CartItem = require("../models/cartitems");

exports.createItem = async (req, res) => {
  try {
    const item = await CartItem.create(req.body);
    res.json({ data: item, status: "success" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
