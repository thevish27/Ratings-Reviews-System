// src/components/Product.js
import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import './Product.css';

const Product = ({ product, user }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${product.id}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>

      <ReviewForm
        user={user}
        productId={product.id}
        onReviewSubmitted={fetchReviews}
      />

      <h4>Reviews:</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="review">
            <strong>{r.user_name}:</strong> {r.rating && `⭐ ${r.rating}`} {r.review_text}
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
