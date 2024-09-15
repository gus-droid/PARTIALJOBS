import express from 'express';
import User from '../models/User.js';  // Import the User model

const router = express.Router();

// POST route to create a new user
router.post('/create', async (req, res) => {
  try {
    const newUser = new User(req.body); // Create a new user with incoming request data
    const savedUser = await newUser.save(); // Save the user to MongoDB
    res.status(201).json(savedUser); // Return the saved user as a response
  } catch (error) {
    console.error('Error saving user data:', error); // Log detailed error information
    res.status(400).json({ message: 'Error saving user data', error: error.message || error }); // Send error message back
  }
});


export default router;
