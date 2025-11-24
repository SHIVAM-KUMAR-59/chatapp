import { emailRegex } from "../../config/init.config.js";
import User from "../../model/user.model.js"
import { ApiError, handleServerError } from "../../util/error.util.js";
import { generateAuthToken } from "../../util/jwt.util.js";
import { hashPassword } from "../../util/bcrypt.util.js";

const signupService = async (userData) => {
    try {

        if (!emailRegex.test(userData.email)) {
            throw new ApiError(400, 'Invalid email format');
        }

        const existingUser = await User.findOne({ email: userData.email });
        if(existingUser) {
            throw new ApiError(400, 'Email already in use');
        }

        const newPassword = await hashPassword(userData.password);
        if(!newPassword) {
            throw new ApiError(500, 'Failed to hash password');
        }

        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: newPassword
        });

        const token = await generateAuthToken(newUser);
        if(!token) {
            throw new ApiError(500, 'Failed to generate authentication token');
        }

        await newUser.save();
        return { user: { id: newUser._id, username: newUser.username, email: newUser.email}, token };
        
    } catch (err) {
        handleServerError(err);
    }
}

export default signupService;