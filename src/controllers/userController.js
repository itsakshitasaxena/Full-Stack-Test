const db = require("../models");

module.exports = {
  approveUser: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.approved = true;
      await user.save();

      res.json({ message: "User approved successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  me: async (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      approved: req.user.approved
    });
  }
};
