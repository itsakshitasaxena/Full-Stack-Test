const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/userController");

router.put("/:id/approve", auth, requireRole("admin"), ctrl.approveUser);
router.get("/me", auth, ctrl.me);

module.exports = router;
