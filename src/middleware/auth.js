// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.ensureAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: "Authentication required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Optional middleware if you need to block logged-in users
exports.ensureGuest = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) return res.status(400).json({ message: "Already logged in" });
    next();
};
