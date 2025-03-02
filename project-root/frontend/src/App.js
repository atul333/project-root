// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CampaignManager from './components/CampaignManager';
import ChannelCatalog from './components/ChannelCatalog';
import Payment from './components/Payment';
import Analytics from './components/Analytics';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/campaigns" element={<CampaignManager />} />
      <Route path="/channels" element={<ChannelCatalog />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default App;
