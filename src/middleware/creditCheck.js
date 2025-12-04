// middleware/creditCheck.js
const CreditService = require('../services/credit.service');

exports.creditCheck = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { totalAmount } = req.body;  // amount of current order

        const credit = await CreditService.getCreditInfo(userId);
        if (!credit) return res.status(400).json({ message: "Credit account not found" });

        const available = credit.limit - credit.used;

        if (available < totalAmount) {
            return res.status(400).json({
                message: "Credit limit exceeded",
                availableCredit: available,
                required: totalAmount
            });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Credit check failed" });
    }
};
