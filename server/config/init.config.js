import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || '1h';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export { DB_URL, PORT, JWT_SECRET, JWT_EXPIRE_TIME, emailRegex };