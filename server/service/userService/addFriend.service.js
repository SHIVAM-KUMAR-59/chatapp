import Chat from '../../model/chat.model.js';
import User from '../../model/user.model.js';
import { ApiError, handleServerError } from '../../util/error.util.js';

const addFriendService = async (user, friendId) => {

    try {
        const friend = await User.findById(friendId);
        if (!friend) {
            throw new ApiError(404, 'User does not exist');
        }
        if(user.friends.includes(friendId)) {
            throw new ApiError(400, 'User is already a friend');
        }

        user.friends.push(friendId);
        friend.friends.push(user._id);

        const newChat = {
            participants: [user._id, friendId],
            messages: []
        }

        await Chat.create(newChat);
        await user.save();
        await friend.save();
        return true;
    } catch (err) {
        handleServerError(err);
    }
}

export default addFriendService;