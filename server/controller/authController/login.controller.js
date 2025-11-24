import loginService from "../../service/authService/login.service.js";

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    if(typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid input types' });
    }

    try {
        const result = await loginService({ email, password });
        return res.status(200).json({ success: true, result });
    } catch (err) {
        next(err)
    }
}

export default loginController