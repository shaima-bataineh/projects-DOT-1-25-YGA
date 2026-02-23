// not found 

const ApiError = require('../utils/ApiError');

function notFound(_req, _res, next) { // this middleware is used to handle 404 errors when no route matches the request
    next(new ApiError(`Not Found: ${_req.method} ${_req.url}`, 404));
}

module.exports = notFound;