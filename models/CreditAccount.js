// backend/models/CreditAccount.js
const pool = require("../config/db");

const CreditAccount = {
  createTable: async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS credit_accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        credit_limit DECIMAL(12,2),
        current_balance DECIMAL(12,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_credit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=INNODB;
    `);
  }
};

module.exports = CreditAccount;
