// frontend/src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Telegram Ads Platform</h1>
      <p>Your one-stop solution for advanced Telegram advertising.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
};

export default LandingPage;
