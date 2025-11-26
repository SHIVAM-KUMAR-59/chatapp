import User from '../../model/user.model.js';
import { ApiError, handleServerError } from '../../util/error.util.js';

const removeFriendService = async (user, friendId) => {
    try {
        const friend = await User.findById(friendId);
        if (!friend) {
            throw new ApiError(404, 'User does not exist');
        }
        if(!user.friends.includes(friendId)) {
            throw new ApiError(400, 'User is not a friend');
        }
        
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== user._id.toString());
        await user.save();
        await friend.save();
        return true;
    } catch (err) {
        console.log(err)
        handleServerError(err);
    }
}

export default removeFriendService;