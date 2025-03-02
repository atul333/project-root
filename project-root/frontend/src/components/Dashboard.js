// frontend/src/components/Dashboard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.name} ({user.role})</p>}
      <nav>
        <Link to="/campaigns">Campaign Manager</Link> |{' '}
        <Link to="/channels">Channel Catalog</Link> |{' '}
        <Link to="/payment">Payment</Link> |{' '}
        <Link to="/analytics">Analytics</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
