import User from "../../model/user.model.js"
import { ApiError, handleServerError } from "../../util/error.util.js";

const getProfileService = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user;
    } catch (err) {
        handleServerError(err);
    }
}

export default getProfileService