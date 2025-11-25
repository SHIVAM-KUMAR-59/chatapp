
import User from '../model/user.model.js';
import { decodeAuthToken } from '../util/jwt.util.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Check Authorization header or cookie
    const headerToken = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies?.token;
    const token = headerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Token missing' });
    }

    const decoded = await decodeAuthToken(token);
    console.log(decoded)

    if (!decoded?.success) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    const user = await User.findById(decoded.token.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - User not found' });
    }

    req.user = user;
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ success: false, message: 'Unauthorized - Token error' });
  }
};

export default authMiddleware;