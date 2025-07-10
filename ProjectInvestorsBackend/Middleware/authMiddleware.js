const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" }); // ✅ fixed
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ check .env key name
    req.user = decoded;
    next();
   } catch (error) {    return res.status(401).json({ message: "Invalid or expired token" }); // ✅ fixed
  }
};

module.exports = authenticateToken;
