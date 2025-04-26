const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido!" });
  }

  jwt.verify(token, "segredo_do_backend", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido ou expirado!" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = authMiddleware;
