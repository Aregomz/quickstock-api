const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/productos', verifyToken, productController.createProduct);
router.get('/productos', verifyToken, productController.getProducts);
router.put('/productos/:id', verifyToken, productController.updateProduct);
router.delete('/productos/:id', verifyToken, productController.deleteProduct);



module.exports = router;
