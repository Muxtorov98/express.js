const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const express = require("express");

module.exports = (app) => {
  // Helmet -> xavfsiz headerlar
  app.use(helmet());

  // CORS -> faqat kerakli domenlarga ruxsat
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  // Rate limiting -> 100 ta request / 15 min
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "❌ Too many requests, please try again later.",
  });
  app.use(limiter);

  // JSON body limit
  app.use(express.json({ limit: "10kb" }));

  // XSS protection
  app.use(xss());

  // MongoDB injectiondan saqlanish
  app.use(mongoSanitize());

  // Response compression
  app.use(compression());
};
