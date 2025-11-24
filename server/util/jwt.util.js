import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRE_TIME } from "../config/init.config.js";

const generateAuthToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const secretKey = JWT_SECRET;
    const options = {
        expiresIn: JWT_EXPIRE_TIME
    };

    return jwt.sign(payload, secretKey, options);
}

const decodeAuthToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return {success: true, token: decoded};
    } catch (err) {
        return {success: false, token: null};
    }
}

export { generateAuthToken, decodeAuthToken };