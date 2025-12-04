// backend/models/Product.js
const pool = require("../config/db");

const Product = {
  createTable: async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150),
        sku VARCHAR(100) UNIQUE,
        description TEXT,
        base_price DECIMAL(12,2),
        moq INT,
        stock INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=INNODB;
    `);
  }
};

module.exports = Product;
