const orderService = require("../services/OrderService");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send("Access denied. Not authenticated...");
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded;
        next();
    } catch (er) {
        res.status(400).send("Invalid auth token...");
    }
};

const checkOrderAccess = async (req, res, next) => {
    auth(req, res, async () => {
        if (req.user) {
            const userIdFromToken = req.user._id;

            try {
                const order = await orderService.getOrderById(req.params.id);
                const userIdFromOrder = order.userId.toString();
                if (userIdFromToken === userIdFromOrder || req.user.role == "employee" || req.user.role == "manager") {
                    next();
                } else {
                    res.status(403).send("Access denied. Not authorized...");
                }
            } catch (error) {
                res.status(404).send("Order not found...");
            }
        } else {
            res.status(400).send("Invalid auth token...");
        }
    });
};

module.exports = { checkOrderAccess };
