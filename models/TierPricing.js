// backend/models/TierPricing.js
const pool = require("../config/db");

const TierPricing = {
  createTable: async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tier_pricing (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        min_qty INT,
        max_qty INT,
        tier_price DECIMAL(12,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_tier_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=INNODB;
    `);
  }
};

module.exports = TierPricing;
