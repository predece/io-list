const jwt = require("jsonwebtoken");

module.exports = function AuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Не авторизован" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.key);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Ваш токен истек" });
    }
    res.status(401).json({ message: "у вас нет прав доступа" });
  }
};
