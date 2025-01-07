// authValidation.js
import { body } from 'express-validator';

// Validation rules for the signup route
export const signupValidationRules = [
    body('username', 'Username is required').notEmpty(), // Ensure the username is not empty
    body('username', 'Username should be at least 5 characters').isLength({ min: 5 }), // Ensure the username is at least 5 characters
    body('email', 'Please include a valid email').isEmail(), // Ensure the email is valid
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }), // Ensure the password is at least 6 characters
]

// Validation rules for the login route
export const loginValidationRules = [
    body('email', 'Please include a valid email').isEmail(), // Ensure the email is valid
    body('password', 'Password is required').exists(), // Ensure password is provided
]
