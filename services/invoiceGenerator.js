// invoice generator
// backend/services/invoiceGenerator.js
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Ensure invoices directory exists
const INVOICE_DIR = path.resolve(__dirname, "..", "invoices");
if (!fs.existsSync(INVOICE_DIR)) {
  fs.mkdirSync(INVOICE_DIR, { recursive: true });
}

/**
 * orderData expected shape (example):
 * {
 *   id: 123,
 *   buyer: { name, email, gst, address },
 *   seller: { name, gst, address },
 *   items: [{ name, qty, unit_price, subtotal }, ...],
 *   subtotal: 1000,
 *   tax: 180,
 *   shipping: 50,
 *   total: 1230,
 *   payment_mode: "Credit" | "Pay Now" | "Net 30",
 *   created_at: "..."
 * }
 */
async function generateInvoice(orderData) {
  // Launch puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  try {
    const page = await browser.newPage();

    // Basic styled HTML invoice template (can be improved later)
    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Invoice ${orderData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; color:#222; padding:24px; }
            .header { display:flex; justify-content:space-between; align-items:center; }
            h1 { margin:0; }
            table { width:100%; border-collapse: collapse; margin-top:16px; }
            table, th, td { border: 1px solid #ddd; }
            th, td { padding:8px; text-align:left; }
            .right { text-align:right; }
            .totals { margin-top:12px; width: 300px; float:right; }
            .small { font-size:11px; color:#555; }
            .meta { margin-top:8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Invoice</h1>
              <div class="small">Invoice #: ${orderData.id}</div>
              <div class="small">Date: ${orderData.created_at || new Date().toLocaleString()}</div>
            </div>
            <div>
              <strong>${orderData.seller?.name || "Seller Name"}</strong><br/>
              GST: ${orderData.seller?.gst || "-"}<br/>
              ${orderData.seller?.address || ""}
            </div>
          </div>

          <hr/>

          <div style="display:flex; justify-content:space-between;">
            <div>
              <strong>Bill To:</strong><br/>
              ${orderData.buyer?.name || ""}<br/>
              GST: ${orderData.buyer?.gst || "-"}<br/>
              ${orderData.buyer?.address || ""}
            </div>

            <div class="meta">
              <strong>Payment Mode:</strong> ${orderData.payment_mode || "Pay Now"}<br/>
              <strong>Order Status:</strong> ${orderData.status || "CONFIRMED"}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.items.map((it, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${it.name}</td>
                  <td>${it.qty}</td>
                  <td class="right">₹${Number(it.unit_price).toFixed(2)}</td>
                  <td class="right">₹${Number(it.subtotal).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="totals">
            <table>
              <tr>
                <td>Subtotal</td>
                <td class="right">₹${Number(orderData.subtotal || orderData.items.reduce((s, i) => s + Number(i.subtotal || (i.qty * i.unit_price)), 0)).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td class="right">₹${Number(orderData.tax || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td class="right">₹${Number(orderData.shipping || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th class="right">₹${Number(orderData.total || 0).toFixed(2)}</th>
              </tr>
            </table>
          </div>

          <div style="clear:both; margin-top:40px;">
            <div class="small">This is a system generated invoice.</div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: "networkidle0" });

    const filename = `invoice_${orderData.id || Date.now()}.pdf`;
    const filepath = path.join(INVOICE_DIR, filename);

    await page.pdf({ path: filepath, format: "A4", printBackground: true });

    await page.close();
    return { success: true, path: filepath };
  } catch (err) {
    console.error("Invoice generation error:", err);
    return { success: false, error: err.message };
  } finally {
    await browser.close();
  }
}

module.exports = { generateInvoice };
