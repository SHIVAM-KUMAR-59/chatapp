import User from "../../model/user.model.js";

const searchService = async (query) => {
    try {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
            ]
        }).select('-password -email -role');
        return users;
    } catch (err) {
        handleServerError(err);
    }
}

export default searchService;