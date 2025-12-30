// src/components/ReviewForm.js
import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ user, productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userName: user.displayName || user.email,
          productId,
          rating,
          reviewText,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Review submitted!');
        setRating('');
        setReviewText('');
        onReviewSubmitted(); // to refresh reviews
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error submitting review: ' + err.message);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        min={1}
        max={5}
        onChange={(e) => setRating(e.target.value)}
      />
      <textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
