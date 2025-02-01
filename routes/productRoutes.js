const router = require('express').Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authGuard');

router.post('/create', authMiddleware.authGuard, productController.createProduct);

// fetch all products for authenticated users
router.get('/get_all_products_auth', authMiddleware.authGuard, productController.getAllProductsAuth);

// fetch all products 
router.get('/get_all_products', productController.getAllProducts);

// Single product
router.get('/get_single_product/:id', productController.getSingleProduct);

// delete product
router.delete('/delete_product/:id', authMiddleware.authGuard, productController.deleteProduct);

// update product
router.put('/update_product/:id', authMiddleware.authGuard, productController.updateProduct);

// pagination
router.get('/pagination', productController.paginationProducts);

module.exports = router;