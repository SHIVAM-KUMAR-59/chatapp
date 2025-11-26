import getProfileService from "../../service/userService/getProfile.service.js";

const getProfileController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const profile = await getProfileService(userId);
        return res.status(200).json({ success: true, profile });
    } catch (err) {
        next(err);
    }
}

export default getProfileController