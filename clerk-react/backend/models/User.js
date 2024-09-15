import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  clerkUserId: String,
  email: String,
  age: { type: String, required: true },  // You can change this to Number if necessary
  height: { type: String, required: true },
  currentWeight: { type: String, required: true },
  goalWeight: { type: String, required: true },
  budget: { type: String, required: true },
  allergies: { type: String },
  dietaryRestrictions: { type: String },
});

// Create a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

export default User;
