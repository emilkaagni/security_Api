const router = require('express').Router();
const categoryController = require('../controller/categoryControllers');
const { adminGuard } = require('../middleware/auth');

// create Category 
router.post('/create', adminGuard, categoryController.createCategory)

// delete Category
router.delete('/delete_category/:id', adminGuard, categoryController.deleteCategory)

// get all caterogy

router.get('/get_all_category', categoryController.getAllCaterogy)


router.get('/getcaterogybyid/:id', categoryController.getCategoryById);

module.exports = router 