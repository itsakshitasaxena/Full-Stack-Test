const db = require("../models");
const pricingService = require("../services/pricingService");

module.exports = {
  upsertCartItem: async (req, res) => {
    try {
      const { product_id, qty } = req.body;

      const product = await db.Product.findByPk(product_id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (qty < product.min_order_qty)
        return res.status(400).json({
          message: `MOQ not met. Required minimum: ${product.min_order_qty}`
        });

      const cart = await db.Cart.findOne({ where: { user_id: req.user.id } });

      const existing = await db.CartItem.findOne({
        where: { cart_id: cart.id, product_id }
      });

      if (existing) {
        existing.qty = qty;
        await existing.save();
      } else {
        await db.CartItem.create({ cart_id: cart.id, product_id, qty });
      }

      res.json({ message: "Cart updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await db.Cart.findOne({
        where: { user_id: req.user.id },
        include: [{ model: db.CartItem, include: [db.Product] }]
      });

      let total = BigInt(0);
      let items = [];

      for (const item of cart.CartItems) {
        const unitPrice = await pricingService.getUnitPriceForQty(item.product_id, item.qty);
        const lineTotal = unitPrice * BigInt(item.qty);
        total += lineTotal;

        items.push({
          id: item.id,
          product: item.Product.name,
          qty: item.qty,
          unit_price_cents: unitPrice.toString(),
          line_total_cents: lineTotal.toString()
        });
      }

      res.json({ items, total_cents: total.toString() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
