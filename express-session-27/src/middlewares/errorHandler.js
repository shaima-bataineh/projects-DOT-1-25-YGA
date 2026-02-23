// src/middlewares/errorHandler.js
const ApiError = require('../utils/ApiError'); // custom error class

// Error-handling middleware يجب أن تكون بأربعة براميتر
function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    status: "error",
    message: err.message || "Internal Server Error",
    details: err.details || null,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}) // stack trace in dev
  });
}

module.exports = errorHandler;
