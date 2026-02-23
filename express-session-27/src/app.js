// this main in app file we will setup our express app and configure it with middlewares and routes.

const express = require('express');
const cors = require('cors'); // this is used to enable CORS (Cross-Origin Resource Sharing) for our API

const helmet = require('helmet'); // this is used to set various HTTP headers for security purposes
const morgan = require('morgan'); // this is used for logging HTTP requests in the console

const ratelimit = require('express-rate-limit'); // this is used to limit the number of requests from a single IP address to prevent abuse
const apiRouter = require('./routes/index'); // this is our main router which will contain all the routes for our API
const logger = require('./middlewares/logger'); // this is our custom logger middleware which logs the details of each incoming request
const notFound = require('./middlewares/notFound'); // this is our custom middleware to handle 404 errors when no route matches the request
const errorHandler = require('./middlewares/errorHandler'); // this is our custom middleware to handle errors and send appropriate responses

function createApp() {
    const app = express();
    // security 
    app.use(helmet());
    // rate limit
    app.use(ratelimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }));

    //cors 
    app.use(cors({origin:true})); // this is used to enable CORS for all origins

    // body parsers
    app.use(express.json()); // this is used to parse JSON request bodies
    app.use(express.urlencoded({ extended: true })); // this is used to parse URL-encoded request bodies

    // logging example
    app.use(logger); // this will log the details of each incoming request using our custom logger middleware
    app.use(morgan('dev')); // this will log the details of each incoming request in the console using morgan with the 'combined' format

//root 
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Express Session 27 API!" });
});

// api 
app.use("/api", apiRouter); // this will mount our main router at the /api path, so all routes defined in the main router will be prefixed with /api

// not found + error handler
app.use(notFound); // this will handle 404 errors when no route matches the request using our custom notFound middleware
app.use(errorHandler); // this will handle errors and send appropriate responses using our custom errorHandler middleware
return app;
}

module.exports = createApp;
