const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

// Register routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✔" });
});

// Error handler
const { errorHandler } = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
