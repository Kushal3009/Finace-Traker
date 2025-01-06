import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/dbConnection.js';
import { User } from './models/User.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;


const startServer = async () => {
    try {
        await connectDB();
        User.sync({ alter: true });


        app.get('/', (req, res) => {
            res.json({ message: 'Hello World' });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();
