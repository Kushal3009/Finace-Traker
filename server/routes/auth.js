// auth.js
import express from 'express';  // Import express to create a router
import { login, signup } from '../services/auth.js'; // Import the login and signup services
import { loginValidationRules, signupValidationRules } from '../validation/authValidation.js'; // Import validation rules
import { validate } from '../middlewares/validationMiddleware.js';  // Import the validation middleware

const router = express.Router();  // Create a new router instance

// Define the signup route
router.post('/signup', signupValidationRules, validate, signup); // POST request to signup route

// Define the login route
router.post('/login', loginValidationRules, validate, login);  // POST request to login route

// Export the router so it can be used in the main app file
export default router;
