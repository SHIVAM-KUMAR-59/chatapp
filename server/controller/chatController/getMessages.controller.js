import getMessagesService from '../../service/chatService/getMessages.service.js';

const getMessagesController = async (req, res, next) => {
    const { userId: otherUserId } = req.params;
    if(!otherUserId) {
        return res.status(400).json({message: 'Other user ID is required'});
    }
    if(!typeof otherUserId === 'string') {
        return res.status(400).json({message: 'Other user ID must be a string'});
    }

    try {
        const messages = await getMessagesService(req.user, otherUserId);
        return res.status(200).json({messages});
    } catch (err) {
        next(err);
    }
}

export default getMessagesController;