// frontend/src/components/Payment.js
import React, { useState } from 'react';
import api from '../services/api';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({ amount: 0, method: 'card' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => setPaymentData({ ...paymentData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/payments', paymentData);
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Make a Payment</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input type="number" name="amount" placeholder="Amount" onChange={onChange} value={paymentData.amount} required />
        <select name="method" onChange={onChange} value={paymentData.method}>
          <option value="card">Card</option>
          <option value="crypto">Crypto</option>
          <option value="bank">Bank Transfer</option>
        </select>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
