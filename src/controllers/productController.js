const db = require("../models");

module.exports = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [{ model: db.TierPrice }]
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { sku, name, description, stock, min_order_qty, price_cents } = req.body;

      const product = await db.Product.create({
        sku,
        name,
        description,
        stock,
        min_order_qty,
        price_cents
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  addTier: async (req, res) => {
    try {
      const { min_qty, max_qty, price_cents } = req.body;

      const tier = await db.TierPrice.create({
        product_id: req.params.id,
        min_qty,
        max_qty,
        price_cents
      });

      res.status(201).json(tier);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
