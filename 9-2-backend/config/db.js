
const mongoose = require("mongoose");// connect to the database

mongoose.connect("mongodb://localhost:27017/homeworkDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
