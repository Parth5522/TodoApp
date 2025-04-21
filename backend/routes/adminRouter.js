// Import necessary modules
import express from 'express';
import {getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/adminController.js';
import { isAuthenticated } from '../middleware/auth.js';

// Create a router instance
const router = express.Router();

// Define routes for user management
router.get('/users', isAuthenticated, getAllUsers); // Fetch all users
router.get('/user/:id',  isAuthenticated, getUserById); // Fetch a single user by ID
router.put('/updateuser/:id',  isAuthenticated, updateUser); // Update user details
router.delete('/deleteuser/:id',  isAuthenticated, deleteUser); // Delete a user

// Export the router
export default router;
