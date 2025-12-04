const db = require("../models");
const pricingService = require("../services/pricingService");
const invoiceService = require("../services/invoiceService");

module.exports = {
  checkout: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { payment_terms } = req.body;

      const cart = await db.Cart.findOne({
        where: { user_id: userId },
        include: [{ model: db.CartItem, include: [db.Product] }],
        transaction: t,
        lock: t.LOCK.UPDATE
      });

      if (!cart || cart.CartItems.length === 0)
        return res.status(400).json({ message: "Cart empty" });

      let subtotal = BigInt(0);
      let items = [];

      for (const item of cart.CartItems) {
        const product = item.Product;

        if (product.stock < item.qty)
          return res.status(400).json({ message: "Insufficient stock" });

        const unitPrice = await pricingService.getUnitPriceForQty(product.id, item.qty);
        const lineTotal = unitPrice * BigInt(item.qty);

        subtotal += lineTotal;
        items.push({ product, qty: item.qty, unitPrice, lineTotal });
      }

      const tax = subtotal * BigInt(18) / BigInt(100);
      const shipping = BigInt(0);
      const total = subtotal + tax + shipping;

      // Credit check
      if (payment_terms === "credit") {
        const credit = await db.CreditAccount.findOne({
          where: { user_id: userId },
          transaction: t,
          lock: t.LOCK.UPDATE
        });

        const newOutstanding = BigInt(credit.outstanding_cents) + total;
        if (newOutstanding > BigInt(credit.credit_limit_cents))
          return res.status(400).json({ message: "Credit limit exceeded" });

        credit.outstanding_cents = newOutstanding.toString();
        await credit.save({ transaction: t });
      }

      const order = await db.Order.create({
        user_id: userId,
        total_cents: total.toString(),
        tax_cents: tax.toString(),
        shipping_cents: shipping.toString(),
        payment_terms
      }, { transaction: t });

      for (const it of items) {
        await db.OrderItem.create({
          order_id: order.id,
          product_id: it.product.id,
          qty: it.qty,
          unit_price_cents: it.unitPrice.toString(),
          line_total_cents: it.lineTotal.toString()
        }, { transaction: t });

        it.product.stock -= it.qty;
        await it.product.save({ transaction: t });
      }

      await db.CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });
      await t.commit();

      // Invoice (optional)
      await invoiceService.generateInvoicePdf(order.id);

      res.json({ message: "Order placed successfully", order_id: order.id });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ message: err.message });
    }
  },

  reorder: async (req, res) => {
    try {
      const order = await db.Order.findOne({
        where: { user_id: req.user.id },
        order: [["createdAt", "DESC"]],
        include: [db.OrderItem]
      });

      if (!order) return res.status(404).json({ message: "No previous order" });

      const cart = await db.Cart.findOne({ where: { user_id: req.user.id } });
      await db.CartItem.destroy({ where: { cart_id: cart.id } });

      for (const item of order.OrderItems) {
        await db.CartItem.create({
          cart_id: cart.id,
          product_id: item.product_id,
          qty: item.qty
        });
      }

      res.json({ message: "Cart filled from previous order" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
