// Importing required modules
import express from 'express'; // Express framework for creating server and routes
import dotenv from 'dotenv'; // dotenv to load environment variables from .env file
import { connectDB } from './utils/dbConnection.js'; // Custom function to connect to the database
import { User } from './models/User.js'; // User model for database operations
import user from './routes/auth.js'; // Authentication routes
import { verifyUser } from './middlewares/verifyUser.js'; // Middleware to verify JWT tokens
import { Category } from './models/Category.js';
import { SubCategory } from './models/SubCategory.js'
import { Transactions } from './models/Transactions.js';
import category from './routes/categorys.js'
import subcategory from './routes/subcategory.js'




dotenv.config(); // Load environment variables

const app = express(); // Create an express app
const PORT = process.env.PORT; // Get the port from environment variables

// Function to start the server
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        // Sync the User model (commented out to prevent unintended schema changes)
        // User.sync({ alter: true });
        // Category.sync({ alter: true })
        // SubCategory.sync({ alter: true })
        // Transactions.sync({ alter: true })

        app.use(express.json()); // Middleware to parse JSON request bodies

        // Route for authentication-related operations (e.g., signup, login)
        app.use('/api/auth', user);
        app.use('/api/category', category);
        app.use('/api/subcategory', subcategory);


        // Protected route that requires user verification
        app.get('/', verifyUser, (req, res) => {
            res.json({ message: 'Hello World' }); // Send a success message if verification passes
        });

        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        // Handle any errors during server startup
        console.error('Failed to start the server:', error);
    }
};

startServer(); // Call the function to start the server
