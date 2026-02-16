const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// get all user by id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

//update user by id
router.patch("/:id", async (req, res) => {
    try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,       // id المستخدم من الـ URL
      { $set: req.body },  // التعديلات من body
      { new: true }        // ترجعلي النسخة المحدثة
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
