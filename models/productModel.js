const db = require('../config/db');

const createProduct = (productData, callback) => {
  const query = `
    INSERT INTO products (name, category, price, stock, description, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const { name, category, price, stock, description, user_id } = productData;
  db.query(query, [name, category, price, stock, description, user_id], callback);
};

const getProductsByUser = (userId, callback) => {
  const query = 'SELECT * FROM products WHERE user_id = ?';
  db.query(query, [userId], callback);
};

const updateProduct = (productId, userId, updatedData, callback) => {
  const query = `
    UPDATE products 
    SET name = ?, category = ?, price = ?, stock = ?, description = ?
    WHERE id = ? AND user_id = ?
  `;
  const { name, category, price, stock, description } = updatedData;

  db.query(query, [name, category, price, stock, description, productId, userId], callback);
};

const deleteProduct = (productId, userId, callback) => {
  const query = 'DELETE FROM products WHERE id = ? AND user_id = ?';
  db.query(query, [productId, userId], callback);
};

module.exports = {
  createProduct,
  getProductsByUser,
  updateProduct,
  deleteProduct
};
