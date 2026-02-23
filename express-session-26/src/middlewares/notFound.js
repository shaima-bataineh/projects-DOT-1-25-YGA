
// function of this code is to create a middleware function that will handle 404 errors when a route is not found. It will create a new ApiError object with a message that includes the HTTP method and the original URL of the request, and a status code of 404. The next function will be called with this error object, which will be handled by the error handling middleware.
const ApiError = require("../utils/ApiError");

function notFound(req, _res, next) // create an error handling middleware function that takes in an error, request, response, and next function
{
    next(new ApiError( `Route not found: ${req.method} ${req.originalUrl}`, 404)); // call the next function with a new ApiError object with a status code of 404 and a message of "Route not found"
}

module.exports = notFound; // export the notFound function to be used in other files

// _res this is var not used in the function but it is required to be passed in as an argument because it is a middleware function and it needs to have the same number of arguments as the other middleware functions. The underscore is used to indicate that this variable is not used in the function.

// originalurl