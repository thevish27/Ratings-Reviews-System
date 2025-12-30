const db = require('./db');

// Check if review already exists
const findReviewByUser = async (userId, productId) => {
  const [rows] = await db.query(
    'SELECT * FROM reviews WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
  return rows;
};

// Add new review
const addReview = async (userId, productId, rating, reviewText, userName) => {
  await db.query(
    'INSERT INTO reviews (user_id, product_id, rating, review_text, user_name) VALUES (?, ?, ?, ?, ?)',
    [userId, productId, rating || null, reviewText || null, userName || 'Anonymous']
  );
};

// Get all reviews for a product
const getReviewsByProduct = async (productId) => {
  const [rows] = await db.query(
    'SELECT * FROM reviews WHERE product_id = ?',
    [productId]
  );
  return rows;
};

module.exports = {
  findReviewByUser,
  addReview,
  getReviewsByProduct,
};
