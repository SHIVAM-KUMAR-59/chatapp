import User from '../../model/user.model.js'
import Chat from '../../model/chat.model.js';
import { ApiError, handleServerError } from '../../util/error.util.js';

const getMessagesService = async (user, otherUserId) => {
    try {
        const otherUser = await User.findById(otherUserId).select('username');
        if(!otherUser) {
            throw new ApiError(404, 'User not found');
        }

        if(!user.friends.includes(otherUserId)) {
            throw new ApiError(403, 'You are not friends with this user');
        }

        const chat = await Chat.findOne({
            participants: { $all: [user._id, otherUserId] }
        }).populate('participants', 'username');

        if(!chat) {
            return [];
        }
        
        return {participants: chat.participants, messages: chat.messages};
    } catch (error) {
        handleServerError(error);
    }
}

export default getMessagesService;