const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');

// POST /api/reviews — Add a new review
router.post('/', addReview);

// GET /api/reviews/:productId — Get reviews for a specific product
router.get('/:productId', getReviews);

module.exports = router;
