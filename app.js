require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const apiV1Routes = require("./routes/api.v1.routes");
const errorHandler = require("./middlewares/error.middleware");
const swaggerDocs = require("./config/swagger");
const securityMiddleware = require("./middlewares/security.middleware");

const app = express();

// 🔐 Security middlewares
securityMiddleware(app);

// 📦 Database
connectDB();

// 🚦 API routes
app.use("/api/v1", apiV1Routes);

// 📑 Swagger docs
swaggerDocs(app);

// ❌ 404 handler
app.use((req, res) => {
  return res.status(404).json({
    statusCode: 404,
    success: false,
    messages: ["Route not found"],
  });
});

// ⚠️ Error handler
app.use(errorHandler);

module.exports = app;
