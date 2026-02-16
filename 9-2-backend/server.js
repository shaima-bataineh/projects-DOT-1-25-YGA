const express = require("express");
require("./config/db");

const app = express();
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
