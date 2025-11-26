import removeFriendService from "../../service/userService/removeFriend.service.js";

const removeFriendController = async (req, res, next) => {
    const { friendId } = req.body;
    if (!friendId) {
        return res.status(400).json({ success: false, message: 'Friend ID is required' });
    }
    if(!typeof friendId === 'string') {
        return res.status(400).json({ success: false, message: 'Invalid friend ID' });
    }
    try {
        const result = await removeFriendService(req.user, friendId);
        return res.status(200).json({ success: true, result });
    } catch (err) {
        next(err)
    }
}

export default removeFriendController;