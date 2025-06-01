const db = require('../config/db');

const createUser = (email, hashedPassword, callback) => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
