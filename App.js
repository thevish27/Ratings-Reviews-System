import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [products] = useState([
    {
      id: 1,
      name: 'Nike Air Max 270',
      description: 'Stylish and comfortable running shoes.',
      image: 'https://images.footlocker.com/is/image/EBFL2/5240334_02?wid=500&hei=500&fmt=png-alpha',
    },
    {
      id: 2,
      name: 'Apple iPhone 13',
      description: 'Powerful smartphone with great camera and performance.',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-family-select?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000',
    },
    {
      id: 3,
      name: 'Sony WH-1000XM4',
      description: 'Industry-leading noise cancelling headphones with long battery life.',
      image: 'https://m.media-amazon.com/images/I/61D4Z3yKPAL._AC_SL1500_.jpg',
    },
    {
      id: 4,
      name: 'Samsung Galaxy Watch 5',
      description: 'Smartwatch with advanced health tracking and sleek design.',
      image: 'https://m.media-amazon.com/images/I/51L5xGWtlnL.jpg',
    },
    {
      id: 5,
      name: 'Canon EOS M50',
      description: 'Compact mirrorless camera with stunning image quality.',
      image: 'https://m.media-amazon.com/images/I/81U00AkAUWL._AC_SL1500_.jpg',
    },
    {
      id: 6,
      name: 'Dell XPS 13',
      description: 'Premium ultrabook with InfinityEdge display and great performance.',
      image: 'https://images.indianexpress.com/2024/05/dell-xps-13-first-impression.jpg',
    },
    {
      id: 7,
      name: 'Fitbit Charge 5',
      description: 'Advanced fitness tracker with built-in GPS and heart rate monitor.',
      image: 'https://puremovementlab.com/cdn/shop/products/Fitbit_Charge_5_Render_3QTR_Core_Lunar_White_Soft_Gold_EDA_Tap_to_Start_Shadow_2048x.jpg?v=1633300622',
    },
    {
      id: 8,
      name: 'Logitech MX Master 3',
      description: 'Ergonomic wireless mouse with precision scroll and long battery life.',
      image: 'https://www.tpstech.in/cdn/shop/files/mx-master-3s-mouse-top-view-graphite.webp?v=1726050681&width=1445',
    },
    {
      id: 9,
      name: 'Amazon Kindle Paperwhite',
      description: 'E-reader with high-resolution display and waterproof design.',
      image: 'https://m.media-amazon.com/images/G/31/kindle/journeys/nNgy62TSAuW8OTbBaQmF4ntGWPnOiLmMI2F1M2Fskb2BZA3D/ZjA5NGI3ODMt._CB641349947_.jpg',
    },
    {
      id: 10,
      name: 'GoPro HERO11',
      description: 'Waterproof action camera with stunning 5.3K video resolution.',
      image: 'https://www.ryans.com/storage/products/main/gopro-hero11-black-creator-edition-27-mp-53k-81718534547.webp',
    },
    {
      id: 11,
      name: 'HP Envy 15',
      description: 'Powerful laptop for creators with dedicated GPU and touchscreen.',
      image: 'https://rukminim2.flixcart.com/image/750/900/computer/n/g/4/hp-envy-notebook-original-imadz77c5pywu4jc.jpeg?q=90&crop=false',
    }
  ]);
  const [reviewData, setReviewData] = useState({});
  const [allReviews, setAllReviews] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchReviews = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
      setAllReviews((prev) => ({
        ...prev,
        [productId]: res.data,
      }));
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    products.forEach((product) => {
      fetchReviews(product.id);
    });
  }, [products]);

  const handleInputChange = (productId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const hasReviewed = (productId) => {
    const reviews = allReviews[productId] || [];
    return reviews.some((r) => r.user_id === user?.uid);
  };

  const handleReviewSubmit = async (productId) => {
    const { rating, review } = reviewData[productId] || {};
    if (!rating && !review) {
      alert('Please provide a rating or a review.');
      return;
    }

    try {
      const payload = {
        product_id: productId,
        user_id: user.uid,
        user_name: user.email,
        rating: parseInt(rating),
        review_text: review,
      };

      const res = await axios.post('http://localhost:5000/api/reviews', payload);

      if (!res?.data?.review) throw new Error("Review not returned from backend");

      await fetchReviews(productId);

      setReviewData((prev) => ({
        ...prev,
        [productId]: { rating: '', review: '' },
      }));

      alert('Review submitted!');
    } catch (err) {
      console.error('Submit review error:', err);
      alert(err?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="App">
      <h1>Ratings & Reviews</h1>
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <>
          <div className="welcome">
            Welcome, <strong>{user.email}</strong>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                {hasReviewed(product.id) ? (
                  <p className="info">You have already reviewed this product.</p>
                ) : (
                  <>
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      min="1"
                      max="5"
                      value={reviewData[product.id]?.rating || ''}
                      onChange={(e) =>
                        handleInputChange(product.id, 'rating', e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Write a review..."
                      value={reviewData[product.id]?.review || ''}
                      onChange={(e) =>
                        handleInputChange(product.id, 'review', e.target.value)
                      }
                    ></textarea>
                    <button onClick={() => handleReviewSubmit(product.id)}>Submit</button>
                  </>
                )}

                <div className="review-section">
                  {(allReviews[product.id] || []).length > 0 && <strong>Reviews:</strong>}
                  <ul>
                    {(allReviews[product.id] || []).map((r, idx) => (
                      r ? (
                        <li key={idx}>
                          <em>{r.user_name}</em> - ⭐ {r.rating} <br />
                          {r.review_text}
                        </li>
                      ) : null
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
