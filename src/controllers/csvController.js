const multer = require("multer");
const parse = require("csv-parse/sync");
const db = require("../models");

const upload = multer({ storage: multer.memoryStorage() });

module.exports = {
  upload,
  uploadCsvToCart: async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "CSV file required" });

      const text = req.file.buffer.toString();
      const rows = parse.parse(text, { columns: true });

      const cart = await db.Cart.findOne({ where: { user_id: req.user.id } });

      let result = [];
      for (const row of rows) {
        const sku = row.sku?.trim();
        const qty = parseInt(row.qty);

        const product = await db.Product.findOne({ where: { sku } });
        if (!product) {
          result.push({ sku, status: "invalid_sku" });
          continue;
        }

        if (qty < product.min_order_qty) {
          result.push({ sku, status: "below_moq" });
          continue;
        }

        await db.CartItem.create({
          cart_id: cart.id,
          product_id: product.id,
          qty
        });

        result.push({ sku, status: "added" });
      }

      res.json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
