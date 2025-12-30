// src/components/ReviewList.js
import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div style={{ marginTop: 15 }}>
      <h4>Reviews:</h4>
      {reviews.map((r, index) => (
        <div key={index} style={{ background: '#f1f1f1', marginBottom: 8, padding: 8 }}>
          {r.rating && <p>⭐ {r.rating}</p>}
          {r.review && <p>{r.review}</p>}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
