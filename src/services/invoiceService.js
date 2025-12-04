const db = require("../models");
const puppeteer = require("puppeteer");

module.exports = {
  generateInvoicePdf: async (orderId) => {
    const order = await db.Order.findByPk(orderId, {
      include: [
        { model: db.OrderItem, include: [db.Product] },
        db.User
      ]
    });

    const rows = order.OrderItems.map(i => `
      <tr>
        <td>${i.Product.sku}</td>
        <td>${i.qty}</td>
        <td>${(Number(i.unit_price_cents) / 100).toFixed(2)}</td>
        <td>${(Number(i.line_total_cents) / 100).toFixed(2)}</td>
      </tr>
    `).join("");

    const html = `
      <html>
      <body>
        <h1>Invoice #${order.id}</h1>
        <p>Customer: ${order.User.email}</p>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr><th>SKU</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          ${rows}
        </table>
        <p>Grand Total: ${(Number(order.total_cents) / 100).toFixed(2)}</p>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: `invoice-${orderId}.pdf`, format: "A4" });
    await browser.close();
  }
};
