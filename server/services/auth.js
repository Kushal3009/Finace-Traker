// Import necessary modules
import { User } from "../models/User.js"; // Import the User model to interact with the database
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing and comparison
import jwt from 'jsonwebtoken'; // Import jwt to create JSON Web Tokens

const salt = 11; // Set the salt rounds for bcrypt hashing

// Signup function
export const signup = async (req, res) => {
    try {
        // Destructure username, email, and password from request body
        const { username, email, password } = req.body;

        // Check if a user with the provided email already exists
        const exist = await User.findOne({ where: { email } });
        if (exist) {
            // If the user already exists, send a 400 error
            return res.status(400).json({ status: '400', msg: "User already exists" });
        }

        // Hash the password using bcrypt before storing it
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the provided details
        const user = await User.create({ username, email, password: hashedPassword });

        // Send a success response with status 200
        res.status(200).json({ status: '200', msg: "User created successfully" });
    } catch (error) {
        // If an error occurs, log it and send a 500 error response
        console.error('Signup Error:', error);
        res.status(500).json({ status: '500', msg: "Failed to Create User" });
    }
}

// Login function
export const login = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;
        console.log(email, password); // Log the email and password for debugging purposes

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // If user is not found, send a 400 error
        if (!user) {
            return res.status(400).json({ status: '400', msg: "User not found" });
        }

        // Compare the provided password with the stored password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            // If passwords don't match, send a 400 error
            return res.status(400).json({ status: '400', msg: "Invalid Password" });
        }

        // Prepare data to include in the JWT token
        const data = {
            id: user.id,
            email: user.email,
            username: user.username
        };

        // Generate JWT token with a 1-day expiration
        const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send the response with a success message and the generated token
        res.status(200).json({ status: '200', msg: "Login Successfully", token: token });
    } catch (error) {
        // If an error occurs, log it and send a 500 error response
        console.error('Login Error:', error);
        res.status(500).json({ status: '500', msg: "Failed to Login" });
    }
}
