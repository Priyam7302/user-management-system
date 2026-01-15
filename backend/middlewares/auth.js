import jwt from "jsonwebtoken";
import "dotenv/config";

export function authenticate(req, res, next) {
    const token = req.cookies.userToken;

    if (!token) {
        return res.status(401).json({message:"Access denied. No token provided"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message:"Invalid token"})
    }
}