const router = require('express').Router();
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authGuard');



router.post('/create', authMiddleware.authGuard, productController.createProduct)

// fetch all products
// router.get('/get_all_products', productController.getAllProducts)
router.get('/get_all_products', authMiddleware.authGuard, productController.getAllProducts);

// Single product
router.get('/get_single_product/:id', productController.getSingleProduct)

// delete product
router.delete('/api/product/delete_product/:id', productController.deleteProduct)

// update product
router.put('/api/product/update_product/:id', productController.updateProduct)

// pagination
router.get('/pagination', productController.paginationProducts)
module.exports = router



// const router = require('express').Router();
// const productController = require('../controllers/productController');
// const { authGuard } = require('../middleware/authGuard');

// router.post('/create', authGuard, productController.createProduct); // Allow any authenticated user to create a product
// router.get('/get_all_products', productController.getAllProducts); // No guard needed for getting all products
// router.get('/get_single_product/:id', productController.getSingleProduct); // No guard needed for getting a single product
// router.delete('/api/product/delete_product/:id', authGuard, productController.deleteProduct); // Allow any authenticated user to delete their product
// router.put('/api/product/update_product/:id', authGuard, productController.updateProduct); // Allow any authenticated user to update their product
// router.get('/pagination', productController.paginationProducts); // No guard needed for pagination

// module.exports = router;
