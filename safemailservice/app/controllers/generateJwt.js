var jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const user = {
    id: 1,
    username: process.env.USERID,
    password: process.env.SERVER_MAIL_PASS,
  };

  exports.generateJwt = (req, res) => {
    try {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey,{expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error);
    }
    
};