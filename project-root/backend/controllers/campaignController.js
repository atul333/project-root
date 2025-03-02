// backend/controllers/campaignController.js
const Campaign = require('../models/Campaign');
const logger = require('../utils/logger');

exports.createCampaign = async (req, res, next) => {
  try {
    // Advanced: Validate and sanitize input here
    const campaign = new Campaign({ ...req.body, createdBy: req.user.id });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    logger.error('Create campaign error: ' + error.message);
    next(error);
  }
};

exports.getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    logger.error('Get campaigns error: ' + error.message);
    next(error);
  }
};
