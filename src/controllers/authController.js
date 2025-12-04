const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, business_name, tax_id } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Email & password required" });

      const existing = await db.User.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: "Email already exists" });

      const password_hash = await bcrypt.hash(password, 10);

      const user = await db.User.create({
        email,
        password_hash,
        business_name,
        tax_id,
        role: "buyer",
        approved: false
      });

      await db.Cart.create({ user_id: user.id });
      await db.CreditAccount.create({ user_id: user.id });

      res.status(201).json({ message: "Registered. Await admin approval." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await db.User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      if (!user.approved)
        return res.status(403).json({ message: "Account not approved yet." });

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
