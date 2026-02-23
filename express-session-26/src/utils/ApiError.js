

class ApiError extends Error // create a custom error class that extends the built-in Error class
 {
  constructor(statusCode = 500, details = null, message) // create a constructor that takes in a status code, details, and message
  {
    super(message);// call the parent constructor with the message
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ApiError; // export the ApiError class to be used in other files