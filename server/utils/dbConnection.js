import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

const DB_NAME = process.env.DATABASE_NAME;
const USER = process.env.DATABASE_USER;
const PASSWORD = process.env.DATABASE_PASSWORD;


const sequelize = new Sequelize(
    DB_NAME,
    USER,
    PASSWORD,
    {
        port: 1434,
        host: 'localhost',
        dialect: 'mssql'
    })

// Function to test the connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MSSQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connectDB };
