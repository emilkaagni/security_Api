// const express = require('express');
// const router = express.Router();
// const Review = require('../models/reviewModel');
// const Product = require('../models/productModel');

// // Add a review to a product
// router.post('/add', async (req, res) => {
//     const { productId, reviewerName, rating, content } = req.body;

//     const review = new Review({
//         productId,
//         reviewerName,
//         rating,
//         content
//     });

//     try {
//         await review.save();
//         const product = await Product.findById(productId);
//         product.reviews.push(review._id);
//         await product.save();
//         res.json({ success: true, review });
//     } catch (error) {
//         res.json({ success: false, message: 'Error adding review', error });
//     }
// });

// // Get reviews for a product
// router.get('/product/:productId', async (req, res) => {
//     const { productId } = req.params;

//     try {
//         const reviews = await Review.find({ productId }).sort({ date: -1 });
//         res.json({ success: true, reviews });
//     } catch (error) {
//         res.json({ success: false, message: 'Error fetching reviews', error });
//     }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

// Add a review to a product
router.post('/add_review/:productId', async (req, res) => {
    console.log("Function 1 working?");

    const { productId } = req.params;
    const { reviewerName, rating, content } = req.body;

    const review = new Review({
        productId,
        reviewerName,
        rating,
        content
    });

    try {
        await review.save();
        const product = await Product.findById(productId);
        product.reviews.push(review._id);
        await product.save();
        res.json({ success: true, review });
    } catch (error) {
        res.json({ success: false, message: 'Error adding review', error });
    }
});

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId }).sort({ date: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        res.json({ success: false, message: 'Error fetching reviews', error });
    }
});

module.exports = router;
