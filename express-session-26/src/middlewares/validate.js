

const {validationResult} = require('express-validator');

const ApiError = require("../utils/ApiError");

function validate(req, _res, next) // create a middleware function that takes in a request, response, and next function

{
    const errors = validationResult(req); // get the validation errors from the request object

    if (!errors.isEmpty()) // check if there are any validation errors
    {
        return next(new ApiError("Invalid data", 400, errors.array())); // call the next function with a new ApiError object with a status code of 400 and a message of "Invalid data" and the validation errors as details

    }
    
    // if there are no validation errors, call the next function controller to move on to the next middleware function
    next(); // call the next function to move on to the next middleware function
}
module.exports = validate; // export the validate function to be used in other files