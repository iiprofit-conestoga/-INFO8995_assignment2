const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Get all users
router.get('/', UserController.getAllUsers);

// Get single user by ID
router.get('/:id', UserController.getUserById);

// Create a new user (New Route)
router.post('/', UserController.createUser);

// Update user by ID
router.put('/:id', UserController.updateUser);

// Delete user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;