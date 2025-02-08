// Import necessary modules
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 11;
const SECRET_KEY = process.env.SECRET_KEY;

// Signup function
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exist = await User.findOne({ where: { email } });
        if (exist) {
            return res.status(400).json({ status: '400', msg: "User already exists" });
        }

        // Hash password securely
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));

        // Create user
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ status: '201', msg: "User created successfully" });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ status: '500', msg: "Failed to Create User", errors: error });
    }
}

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ status: '400', msg: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ status: '400', msg: "Invalid Password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, SECRET_KEY, { expiresIn: '1d' });

        res.status(200).json({ status: '200', msg: "Login Successfully", token });
    } catch (error) {
        res.status(500).json({ status: '500', msg: "Failed to Login", errors: error });
    }
}
