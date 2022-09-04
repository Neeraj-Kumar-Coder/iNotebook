const jwt = require("jsonwebtoken");

const JWT_SIGNATURE = "@sign@tureto^%#112";

const getuser = (req, res, next) => {
    // Get the user from the JWT token and add id to the request
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Access denied" });
    }

    try {
        const data = jwt.verify(token, JWT_SIGNATURE);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Access denied" });
    }
}

module.exports = getuser;