import getFriendsService from "../../service/userService/getFriends.service.js"

const getFriendsController = async (req, res, next) => {
    try {
        const userId = req.user.id
        const friends = await getFriendsService(userId)
        res.status(200).json({ success: true, friends })
    } catch (err) {
        next(err)
    }
}

export default getFriendsController;