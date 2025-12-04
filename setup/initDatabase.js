// db init
// backend/setup/initDatabase.js
const User = require("../models/User");
const Product = require("../models/Product");
const TierPricing = require("../models/TierPricing");
const CreditAccount = require("../models/CreditAccount");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

async function initDB() {
  try {
    console.log("Creating tables... (order matters due to FKs)");

    // Order matters: create parent tables first
    await User.createTable();
    console.log("→ users table OK");

    await Product.createTable();
    console.log("→ products table OK");

    // Now tables that reference products/users
    await TierPricing.createTable();
    console.log("→ tier_pricing table OK");

    await CreditAccount.createTable();
    console.log("→ credit_accounts table OK");

    await Order.createTable();
    console.log("→ orders table OK");

    await OrderItem.createTable();
    console.log("→ order_items table OK");

    console.log("✅ All tables created successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

initDB();
