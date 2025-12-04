const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const ctrl = require("../controllers/orderController");

router.post("/checkout", auth, ctrl.checkout);
router.post("/reorder", auth, ctrl.reorder);

module.exports = router;
