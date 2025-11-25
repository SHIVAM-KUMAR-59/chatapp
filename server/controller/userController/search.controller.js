import searchService from "../../service/userService/search.service.js";

const searchController = async (req, res, next) => {
    const { query } = req.query;
    if(!query || query.length === 0 || query.trim() === '') {
        return res.status(400).json({ success: false, message: 'Query parameter is required' });
    }
    if(query && typeof query !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid query parameter' });
    }
    try {
        const users = await searchService(query);
        return res.status(200).json({ success: true, data: users });
    } catch (err) {
        next(err);
    }

}

export default searchController