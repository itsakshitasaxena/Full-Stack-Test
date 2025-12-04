const db = require("../models");

module.exports = {
  getUnitPriceForQty: async (productId, qty) => {
    const tiers = await db.TierPrice.findAll({
      where: { product_id: productId },
      order: [["min_qty", "DESC"]]
    });

    for (const t of tiers) {
      if (qty >= t.min_qty && (t.max_qty === null || qty <= t.max_qty)) {
        return BigInt(t.price_cents);
      }
    }

    const product = await db.Product.findByPk(productId);
    return BigInt(product.price_cents);
  }
};
