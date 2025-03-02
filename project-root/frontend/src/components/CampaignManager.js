// frontend/src/components/CampaignManager.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CampaignManager = () => {
  const [campaign, setCampaign] = useState({ title: '', description: '', adContent: '', budget: 0, channels: [] });
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  const onChange = (e) =>
    setCampaign({ ...campaign, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/campaigns', campaign);
      setCampaigns((prev) => [res.data, ...prev]);
      setCampaign({ title: '', description: '', adContent: '', budget: 0, channels: [] });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating campaign');
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await api.get('/campaigns');
      setCampaigns(res.data);
    } catch (err) {
      setError('Error fetching campaigns');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Campaign Manager</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input type="text" name="title" placeholder="Campaign Title" onChange={onChange} value={campaign.title} required />
        <textarea name="description" placeholder="Description" onChange={onChange} value={campaign.description} />
        <textarea name="adContent" placeholder="Ad Content" onChange={onChange} value={campaign.adContent} required />
        <input type="number" name="budget" placeholder="Budget" onChange={onChange} value={campaign.budget} required />
        <input
          type="text"
          name="channels"
          placeholder="Channel IDs (comma separated)"
          onChange={(e) => setCampaign({ ...campaign, channels: e.target.value.split(',').map(ch => ch.trim()) })}
        />
        <button type="submit">Create Campaign</button>
      </form>
      <div>
        <h3>Your Campaigns</h3>
        <ul>
          {campaigns.map((camp) => (
            <li key={camp._id}>{camp.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignManager;
