 // this validate middleware is used to check if the user is authenticated before allowing access to protected routes.

 // give me to this code sumerization in english 

const { validationResult } = require('express-validator'); // this is used to check the validation result of the request
const ApiError = require('../utils/ApiError'); // this make custom error 

function validate(req, _res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(400, errors.array(), "Validation failed"));// if there are validation errors, we create a new ApiError with status code 400 and pass the errors array as details
    }
    next();
}

module.exports = validate;

// give me to this code sumerization in english