//start with database connection

const mongoose = require('mongoose');// import mongose to connect to mongodb

 async function connectDB(mongoURL) // create a function to connect to mongodb

 {

    if (!mongoURL) throw new Error("no MONGO_URL provided in .env");

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoURL, { // connect to mongodb with the provided url
        autoIndex: false,

    });

    console.log("MongoDB connected...");
}

module.exports = connectDB; // export the connectDB function to be used in other files