const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }

  // Verificar si ya existe el usuario
  userModel.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error al encriptar la contraseña' });

      // Crear el nuevo usuario
      userModel.createUser(email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al crear el usuario' });
        return res.status(201).json({ message: 'Usuario registrado correctamente' });
      });
    });
  });
};


const login = (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: 'Correo y contraseña requeridos' });
  }

  userModel.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en el servidor' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = results[0];

    // Comparar contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error en el servidor' });
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Generar token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token
      });
    });
  });
};

module.exports = {
  register,
  login
};

