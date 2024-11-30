const { users } = require('../models/init-models')(require('../utils/db').sequelize);

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, surname, contact_number, username, address, email, occupation } = req.body;

    const newUser = await users.create({
      name,
      surname,
      contact_number,
      username,
      address,
      email,
      occupation,
    });

    return res.status(201).json({ message: 'User created successfully', users: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Get all user
const getAllUsers = async (req, res) => {
  try {
    const alluser = await users.findAll();
    return res.status(200).json(alluser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedUser = await users.findByPk(id);

    if (!selectedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(selectedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const selectedUser = await users.findOne({ where: { username } });
  
      if (!selectedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(selectedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  };

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, contact_number, address, email, occupation } = req.body;

    const user = await users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ name, surname, contact_number, address, email, occupation });

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
