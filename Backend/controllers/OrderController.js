const orderService = require("../services/OrderService");
const Order = require("../models/order.js");
const moment = require("moment");

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const order = await orderService.getAllOrders();
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        res.json({ data: order, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getOrderStats = async (req, res) => {
    const previousMonth = moment()
        .month(moment().month() - 5)
        .set("data", 1)
        .format("YYYY-MM-DD HH:mm:ss");

    try {

        // User MongoDB Aggregation Operations
        const orders = await Order.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previousMonth) } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).send(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}


exports.getIncomeStats = async (req, res) => {
    const previousMonth = moment()
        .month(moment().month() - 5)
        .set("data", 1)
        .format("YYYY-MM-DD HH:mm:ss");

    try {
        // User MongoDB Aggregation Operations

        const income = await Order.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previousMonth) } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$total",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).send(income);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getOneWeekSales = async (req, res) => {
    const last7Days = moment()
        .day(moment().day() - 7)
        .format("YYYY-MM-DD HH:mm:ss");

    try {
        // User MongoDB Aggregation Operations

        const income = await Order.aggregate([
            {
                $match: { createdAt: { $gte: new Date(last7Days) } },
            },
            {
                $project: {
                    day: { $dayOfWeek: "$createdAt" },
                    sales: "$total",
                },
            },
            {
                $group: {
                    _id: "$day",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).send(income);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getOrderByUserId = async (req, res) => {
    try {
        const orders = await orderService.getOrderByUserId(req.params.userId);
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send(err);
    }
}