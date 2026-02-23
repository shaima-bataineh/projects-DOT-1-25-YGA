// take authorization header and check if it is valid

const ApiError = require('../utils/ApiError'); // this make custom error 

function auth(req, _res, next) { 
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.substring(7) : null; // Bearer token this token generate after the login token is a هويه دخول لتكمل فيها 

    const expected = process.env.AUTH_TOKEN; // this token should be set in env file
    if (!token) return next(new ApiError("Authorization header missing or malformed", 401));
    if (!expected) return next(new ApiError("Server misconfiguration: AUTH_TOKEN not set", 500));
    if (token !== expected) return next(new ApiError("Unauthorized: Invalid token", 401));

    req.user ={id: "u1", name: "student", role:"user"}; // this is just a mock user object for demonstration purposes
    next();
}

module.exports = auth;