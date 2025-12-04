const { generateInvoice } = require("./services/invoiceGenerator");

async function test() {
    const data = {
        id: 1001,
        buyer: { name: "Demo Buyer", gst: "GST123", address: "Delhi" },
        seller: { name: "Demo Seller", gst: "GST999", address: "Mumbai" },
        items: [
            { name: "Item A", qty: 10, unit_price: 50, subtotal: 500 },
            { name: "Item B", qty: 5, unit_price: 100, subtotal: 500 }
        ],
        subtotal: 1000,
        tax: 180,
        shipping: 50,
        total: 1230,
        payment_mode: "Credit"
    };

    const result = await generateInvoice(data);
    console.log(result);
}

test();
