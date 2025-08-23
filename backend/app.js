require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const apiV1Routes = require("./routes/api.v1.routes");
const errorHandler = require("./middlewares/error.middleware");
const swaggerDocs = require("./config/swagger");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1", apiV1Routes);

swaggerDocs(app);

app.use((req, res) => {
  return res.status(404).json({
    statusCode: 404,
    success: false,
    messages: ["Route not found"],
  });
});

app.use(errorHandler);

module.exports = app;
