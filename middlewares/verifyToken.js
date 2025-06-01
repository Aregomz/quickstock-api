const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Esperamos: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ahora puedes acceder a req.user.userId en las rutas
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
