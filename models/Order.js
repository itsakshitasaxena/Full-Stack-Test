// backend/models/Order.js
const pool = require("../config/db");

const Order = {
  createTable: async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total_amount DECIMAL(12,2),
        tax_amount DECIMAL(12,2) DEFAULT 0,
        shipping_amount DECIMAL(12,2) DEFAULT 0,
        payment_mode VARCHAR(50),
        credit_used DECIMAL(12,2) DEFAULT 0,
        status VARCHAR(30) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=INNODB;
    `);
  }
};

module.exports = Order;
