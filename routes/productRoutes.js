const router = require('express').Router();
const productController = require('../controllers/productController')


router.post('/create', productController.createProduct)

// fetch all products
router.get('/get_all_products', productController.getAllProducts)

// Single product
router.get('/get_single_product/:id', productController.getSingleProduct)

// delete product
router.delete('/api/product/delete_product/:id', productController.deleteProduct)

// update product
router.put('/api/product/update_product/:id',  productController.updateProduct)

// pagination
router.get('/pagination', productController.paginationProducts)
module.exports = router
