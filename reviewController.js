// controllers/reviewController.js
const db = require('../models/db');

const addReview = (req, res) => {
  const { product_id, user_id, user_name, rating, review_text } = req.body;

  if (!product_id || !user_id || (!rating && !review_text)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  const sql =
    'INSERT INTO reviews (product_id, user_id, user_name, rating, review_text) VALUES (?, ?, ?, ?, ?)';
  db.query(
    sql,
    [product_id, user_id, user_name, rating, review_text],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      // Return inserted review using inserted ID
      const fetchInsertedReview = 'SELECT * FROM reviews WHERE id = ?';
      db.query(fetchInsertedReview, [result.insertId], (err2, reviewResult) => {
        if (err2) {
          console.error('Fetch inserted review error:', err2);
          return res.status(500).json({ message: 'Review inserted but fetch failed' });
        }

        return res.status(201).json({ review: reviewResult[0] });
      });
    }
  );
};

const getReviews = (req, res) => {
  const productId = req.params.productId;
  const sql = 'SELECT * FROM reviews WHERE product_id = ?';
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch reviews' });
    }
    res.json(results);
  });
};

module.exports = { addReview, getReviews };
