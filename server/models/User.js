// Import necessary modules from Sequelize
import { DataTypes } from "sequelize"; // Import the DataTypes object from Sequelize to define data types
import { sequelize } from "../utils/dbConnection.js"; // Import the sequelize instance to interact with the database

// Define the 'User' model using Sequelize
const User = sequelize.define('User', {
    // Define the 'username' field with the STRING data type and not nullable
    username: {
        type: DataTypes.STRING, // Define the data type as STRING
        allowNull: false // Username cannot be null
    },
    // Define the 'email' field with the STRING data type, not nullable, and unique
    email: {
        type: DataTypes.STRING, // Define the data type as STRING
        allowNull: false, // Email cannot be null
        unique: true // Email must be unique in the database
    },
    // Define the 'password' field with the STRING data type and not nullable
    password: {
        type: DataTypes.STRING, // Define the data type as STRING
        allowNull: false // Password cannot be null
    },
    otp: {
        type: DataTypes.STRING, // Store OTP as string
        allowNull: true,
    },
    otpExpiry: {
        type: DataTypes.DATE, // Store expiry time
        allowNull: true,
    },
}, {
    // Disable automatic timestamps for 'createdAt' and 'updatedAt'
    timestamps: true // No need to automatically create timestamps for this model
});

// Export the User model to be used in other parts of the application
export { User };
