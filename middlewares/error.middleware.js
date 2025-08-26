const { errorResponse } = require("../utils/response");

function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err);

  // Joi xatolari
  const isJoi = err.isJoi || (err.details && Array.isArray(err.details));
  if (isJoi) {
    const messages = err.details.map(d => ({
      Path: d.context.key,
      error: d.message.replace(/\"/g, "") // qo'shtirnoqlarni olib tashlash
    }));
    return errorResponse(res, 422, messages);
  }

  // MongoDB duplicate key
  if (err && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 422, [
      {
        Path: field,
        error: "Duplicate key error"
      }
    ]);
  }

  // Mongoose CastError (masalan noto‘g‘ri ObjectId)
  if (err && err.name === "CastError") {
    return errorResponse(res, 400, [
      {
        Path: err.path,
        error: "Invalid ID format"
      }
    ]);
  }

  // Mongoose ValidationError
  if (err && err.name === "ValidationError" && err.errors) {
    const messages = Object.keys(err.errors).map(field => ({
      Path: field,
      error: err.errors[field].message.replace(/^Path `\w+` /, "")
    }));
    return errorResponse(res, 422, messages);
  }

  // Default error
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  return errorResponse(res, status, [
    {
      Path: "unknown",
      error: message
    }
  ]);
}

module.exports = errorHandler;
