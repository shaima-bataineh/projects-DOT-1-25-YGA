const express = require('express');
const {body, param, query} = require('express-validator'); // this is used to validate the request data
const validate = require('../middlewares/validate'); // this is our custom middleware to handle validation results

const users= require('../controllers/users.controller'); // this is our users controller which contains the logic for handling user-related requests

const router = express.Router();

// define the routes for users
 router.get("/", 
    [query("search").optional().isString().trim() ], 
    users.listUsers
); // this route will handle GET requests to /users and it will validate the search query parameter if provided

router.get("/:id", 
    [param("id").isString().trim().notEmpty()],
    validate, // this will check the validation result of the id parameter and if there are errors it will return a 400 response with the error details 
    users.getUser
); // this route will handle GET requests to /users/:id and it will validate the id parameter

router.post("/",
    [
        body("name").isString().trim().notEmpty(), 
        body("email").isEmail().normalizeEmail(), // this will validate that the email field is a valid email and it will also normalize it (e.g. convert to lowercase)

    ],
    validate, // this will check the validation result of the request body and if there are errors it will return a 400 response with the error details
    users.createUser
); // this route will handle POST requests to /users and it will validate the name and email fields in the request body

router.patch("/:id",
    [
        param("id").isString().trim().notEmpty(),
        body("name").optional().isString().trim().isLength({ min: 2, max: 50 }), // this will validate that the name field is a string between 2 and 50 characters if it is provided in the request body
        body("email").optional().isEmail().normalizeEmail(),
    ],

    validate, // this will check the validation result of the request and if there are errors it will return a 400 response with the error details
    users.updateUser
); // this route will handle PATCH requests to /users/:id and it will validate the id parameter and the optional name and email fields in the request body

router.delete("/:id",
    [param("id").isString().trim().notEmpty()],
    validate, // this will check the validation result of the id parameter and if there are errors it will return a 400 response with the error details
    users.deleteUser
); // this route will handle DELETE requests to /users/:id and it will validate the id parameter

module.exports = router;