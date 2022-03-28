const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Please provide a token");
  try {
    const decodedToken = jwt.verify(token, config.get("jwt_PrivateKey"));
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
module.exports = auth;
