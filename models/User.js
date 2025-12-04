// backend/models/User.js
const pool = require("../config/db");

const User = {
  createTable: async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password TEXT,
        role VARCHAR(20),
        gst_number VARCHAR(50),
        approved BOOLEAN DEFAULT FALSE
      ) ENGINE=INNODB;
    `);
  }
};

module.exports = User;
