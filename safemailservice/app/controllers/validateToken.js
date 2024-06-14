var jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

exports.validateJwtToken = (req, res,next) => {
    const token = req.body.token
    if (!token) return res.status(401).json({ message: 'Authentication failed' });
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Invalid token' });
    }
};