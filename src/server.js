require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log("⏳ Connecting to database...");
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    console.log("⏳ Syncing models (creating tables if needed)...");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error.message);
  }
})();
