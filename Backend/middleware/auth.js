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


// For Customer Profile
const isCustomer = (req, res, next) => {
    auth(req, res, () => {
        if ((req.user && ((req.user._id === req.params.id && req.user.role == "customer")) || req.user.role == "employee" || req.user.role == "manager")) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized...");
        }
    });
};


// For Employee Profile
const isEmployee = (req, res, next) => {
    auth(req, res, () => {
        if (req.user && (req.user.role == "employee" || req.user.role == "manager")) {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized...");
        }
    });
};


// For Manager
const isManager = (req, res, next) => {
    auth(req, res, () => {
        if (req.user && req.user.role == "manager") {
            next();
        } else {
            res.status(403).send("Access denied. Not authorized...");
        }
    });
};


module.exports = { isCustomer, isEmployee, isManager };