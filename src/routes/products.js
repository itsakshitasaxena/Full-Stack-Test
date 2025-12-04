const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/productController");

router.get("/", ctrl.list);
router.post("/", auth, requireRole("admin"), ctrl.create);
router.post("/:id/tiers", auth, requireRole("admin"), ctrl.addTier);

module.exports = router;
