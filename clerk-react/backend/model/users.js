// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route to save user data to MongoDB
router.post('/create', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error saving user data', error });
  }
});

module.exports = router;
