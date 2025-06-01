const productModel = require('../models/productModel');

const createProduct = (req, res) => {
  const { name, category, price, stock, description } = req.body;
  const user_id = req.user.userId; // viene del token

  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const newProduct = {
    name,
    category,
    price,
    stock,
    description,
    user_id
  };

  productModel.createProduct(newProduct, (err, result) => {
    if (err) {
      console.error('Error al crear producto:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    res.status(201).json({ message: 'Producto creado correctamente', productId: result.insertId });
  });
};

const getProducts = (req, res) => {
  const user_id = req.user.userId;

  productModel.getProductsByUser(user_id, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    res.status(200).json({ products: results });
  });
};

const updateProduct = (req, res) => {
  const user_id = req.user.userId;
  const productId = req.params.id;
  const { name, category, price, stock, description } = req.body;

  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const updatedData = { name, category, price, stock, description };

  productModel.updateProduct(productId, user_id, updatedData, (err, result) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado o no autorizado' });
    }

    res.status(200).json({ message: 'Producto actualizado correctamente' });
  });
};

const deleteProduct = (req, res) => {
  const user_id = req.user.userId;
  const productId = req.params.id;

  productModel.deleteProduct(productId, user_id, (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ message: 'Error del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado o no autorizado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  });
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
