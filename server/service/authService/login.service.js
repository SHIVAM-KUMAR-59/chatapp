import User from "../../model/user.model.js"
import { comparePassword } from "../../util/bcrypt.util.js";
import { ApiError, handleServerError } from "../../util/error.util.js";
import { generateAuthToken } from "../../util/jwt.util.js";

const loginService = async (credentials) => {
    try {
        // Logic for user login
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
            throw new ApiError(404, 'No user with this email found');
        }

        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid password');
        }

        const token = await generateAuthToken(user);
        if (!token) {
            throw new ApiError(500, 'Failed to generate authentication token');
        }

        return { user: { id: user._id, username: user.username, email: user.email }, token };
    } catch (err) {
        handleServerError(err);
    }
}

export default loginService;