// backend/models/Campaign.js
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Campaign title is required'], trim: true },
  description: { type: String },
  adContent: { type: String, required: [true, 'Ad content is required'] },
  channels: [{ type: String }],  // Example: Telegram channel IDs or names
  budget: { type: Number, required: [true, 'Budget is required'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
