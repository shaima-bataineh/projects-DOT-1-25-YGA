const express = require('express');

const usersRouter = require('./users.route'); // this is our users route which contains the routes for handling user-related requests
const profileRouter = require('./profile.routes'); // this is our profile route which contains the routes for handling profile-related requests

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true, message: "Server is healthy!" });
});

router.use("/users", usersRouter);
router.use("/profile", profileRouter);

module.exports = router;