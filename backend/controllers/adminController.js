// Import necessary modules
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { User } from '../models/userSchema.js';
// import ErrorHandler from '../middleware/error.js';

export const getAllUsers = catchAsyncError(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    })
});

  // Fetch a single user by ID
export const getUserById = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        success: true,
        user,
    });
});

  // Update user details
export const updateUser = catchAsyncError(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        success: true,
        message: "User Updated!"
    });
});

  // Delete a user
export const deleteUser = catchAsyncError(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        success: true,
        message: "User Deleted!",
    });
});
