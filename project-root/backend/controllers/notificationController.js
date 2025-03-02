// backend/controllers/notificationController.js
const Notification = require('../models/Notification');
const logger = require('../utils/logger');

exports.createNotification = async (req, res, next) => {
  try {
    const notification = new Notification({ ...req.body, user: req.user.id });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    logger.error('Create notification error: ' + error.message);
    next(error);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    logger.error('Get notifications error: ' + error.message);
    next(error);
  }
};
