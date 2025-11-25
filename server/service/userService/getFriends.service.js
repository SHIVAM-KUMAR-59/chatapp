import User from "../../model/user.model.js"
import { ApiError, handleServerError } from "../../util/error.util.js";

const getFriendsService = async (userId) => {

    try {
        const user = await User.findById(userId).populate('friends', 'id username email');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        return user.friends
    } catch (err) {
        handleServerError(err);
    }
}

export default getFriendsService;