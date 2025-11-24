import signupService from "../../service/authService/signup.service.js";

const signupController = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }

    if(typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid input types' });
    }

    try {
        const result = await signupService({ username, email, password });
        return res.status(200).json({ success: true, result });
    } catch (err) {
        next(err)
    }
}

export default signupController