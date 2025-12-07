import editProfileService from '../../service/userService/edit.service.js'

const editProfileController = async (req, res, next) => {
    const { username, email } = req.body;
    if(!username && !email) {
        return res.status(400).json({ success: false, message: 'Username or email are required' });
    }
    try {
        const user = await editProfileService(req.user, { username, email });
        return res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
}

export default editProfileController