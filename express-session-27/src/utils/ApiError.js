
class ApiError extends Error {

  constructor(statusCode = 500, details = null, message) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ApiError;