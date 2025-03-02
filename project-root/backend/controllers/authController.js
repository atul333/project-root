// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error('User already exists');
    }
    user = new User({ name, email, password, role });
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) return next(err);
        res.status(201).json({
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
      }
    );
  } catch (error) {
    logger.error('Register error: ' + error.message);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error('Invalid credentials');
    }
    const payload = { id: user.id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) return next(err);
        res.json({
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
      }
    );
  } catch (error) {
    logger.error('Login error: ' + error.message);
    next(error);
  }
};
