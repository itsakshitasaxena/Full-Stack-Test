const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const cartCtrl = require("../controllers/cartController");
const csvCtrl = require("../controllers/csvController");

router.post("/item", auth, cartCtrl.upsertCartItem);
router.get("/", auth, cartCtrl.getCart);
router.post("/upload", auth, csvCtrl.upload.single("file"), csvCtrl.uploadCsvToCart);

module.exports = router;
