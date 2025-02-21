const { User } = require('../Models');
const logger = require('../utils/loggers');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    logger.info('Fetched all users.');
    res.json(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      logger.warn(`User not found with ID: ${req.params.id}`);
      return res.status(404).json({ error: 'User not found' });
    }
    logger.info(`Fetched user with ID: ${req.params.id}`);
    res.json(user);
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, city, contactNo } = req.body;
    if (!fullname || !email || !city || !contactNo) {
      logger.warn('Validation error: Missing fields in create user.');
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await User.create({ fullname, email, city, contactNo });
    logger.info(`User created with ID: ${user.id}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      logger.warn(`Update failed: User not found with ID: ${req.params.id}`);
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    logger.info(`User updated with ID: ${req.params.id}`);
    res.json(user);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      logger.warn(`Delete failed: User not found with ID: ${req.params.id}`);
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    logger.info(`User deleted with ID: ${req.params.id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};