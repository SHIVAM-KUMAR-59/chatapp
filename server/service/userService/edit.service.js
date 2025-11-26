import { handleServerError } from "../../util/error.util.js";
const editUserService = async (user, {username, email}) => {
    try {
        user.username = username;
        user.email = email;
        await user.save();
        return user;
    } catch (err) {
        handleServerError(err);
    }
}

export default editUserService