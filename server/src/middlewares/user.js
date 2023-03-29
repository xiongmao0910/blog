// Import library
const jwt = require("jsonwebtoken");

class UserMiddlewares {
    verifyToken(req, res, next) {
        const token = req.params.token;

        if (!token) {
            return res.status(404).json({ msg: "Không tìm thấy token" });
        }

        jwt.verify(token, "secret", (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "Sai token!" });
            }

            req.id = user.id;
        });

        next();
    }
}

module.exports = new UserMiddlewares();
