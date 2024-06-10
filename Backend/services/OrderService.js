const Order = require("../models/order.js");

exports.createOrder = async (order) => {
    return await Order.create(order);
};

exports.getAllOrders = async () => {
    return await Order.find();
}

exports.getOrderById = async (id) => {
    return await Order.findById(id);
};

exports.updateOrder = async (id, order) => {
    return await Order.findByIdAndUpdate(id, order);
}

exports.deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
}

exports.getOrderByUserId = async (id) => {
    return await Order.find({ userId: id });
}