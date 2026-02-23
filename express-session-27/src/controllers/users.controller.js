const ApiError = require('../utils/ApiError');

let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
]; // this will be our in-memory "database" for users

function listUsers(req, res) {
    const search = string(req.query.search || "").toLowerCase(); // this will get the search query from the request, if not provided it will be an empty string
    const data = search 
        ? users.filter(u => u.name.toLowerCase().includes(search) 
        || 
        u.email.toLowerCase().includes(search)) // if search query is provided, we filter the users based on name or email
        : users; // if no search user, we return all users

    res.json({ ok:true, data,total: data.length }); // we send the response with the filtered data and total count
} // status is 200 by default for successful response


function getUser(req, res, next) {
    const {id} = req.params; // this will get the id parameter from the request URL
    const user = users.find(u => u.id ===id);
    if (!user) return next(new ApiError("User not found", 404)); // if user is not found, we create a new ApiError with status code 404 and pass it to the next middleware
    res.json({ ok:true, data: user }); // if user is found, we send the response with the user data
}

function createUser(req, res) {
    const { name, email } = req.body; // this will get the name and email from the request body
    const id = string(Date.now()); // we generate a new id for the user using the current timestamp
    const user = { id, name, email };
    users.unshift(user); // we add the new user to the beginning of the users array
    res.status(201).json({ ok:true, data: user }); // we send the response with the created user data and set the status to 201 for created
}
// in post what is the status ? in post the status is 201 for created

// patch 
function updateUser(req, res, next) {
    const {id} = req.params; // this will get the id parameter from the request URL
    const idx = users.findIndex(u => u.id ===id);
    if (idx === -1) return next(new ApiError("User not found", 404)); // if user is not found, we create a new ApiError with status code 404 and pass it to the next middleware

    users[idx] = { ...users[idx], ...req.body }; // we update the user data by merging the existing user data with the new data from the request body
    res.json({ ok:true, data: users[idx] }); // we send the response with the updated user data
}

// delete 
function deleteUser(req, res, next) {
    const {id} = req.params; // this will get the id parameter from the request URL
    const before = users.length; // we store the length of the users array before deletion
    users = users.filter(u => u.id !==id); // we filter out the user with the given id from the users array

    if (users.length === before) return next(new ApiError("User not found", 404)); // if the length of the users array is the same as before, it means the user was not found and we create a new ApiError with status code 404 and pass it to the next middleware
    res.json({ ok:true, message: "User deleted" }); // if the user was successfully deleted, we send a response with a success message
}

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};