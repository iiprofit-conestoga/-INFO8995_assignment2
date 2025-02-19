const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Importing the Sequelize instance

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure valid email format
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/i, // Ensure only numbers are allowed
      },
    },
  },
  {
    sequelize, // Pass sequelize here directly
    modelName: 'User',
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = User;