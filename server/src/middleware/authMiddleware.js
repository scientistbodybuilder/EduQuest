// verify jwt to access user data
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
        req.user = decoded; // attach user info to request, use req.user.sub to fetch user-specific data
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

};