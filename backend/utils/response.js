function normalizeMessage(msg) {
  // agar array bo'lsa array qaytaradi
  if (Array.isArray(msg)) return msg;
  // string yoki boshqa narsani string qilib qaytaradi
  return msg;
}

function successResponse(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    messages: normalizeMessage(message),
    ...(data !== null ? { data } : {})
  });
}

function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    messages: normalizeMessage(message),
  });
}

module.exports = { successResponse, errorResponse };
