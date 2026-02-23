const express = require("express");
const auth = require("../middlewares/auth");
const { getProfile } = require("../controllers/profile.controller");

const router = express.Router();

router.get("/", auth, getProfile);

module.exports = router;