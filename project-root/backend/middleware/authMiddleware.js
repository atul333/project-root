// backend/middleware/authMiddleware.js
const passport = require('passport');

exports.protect = passport.authenticate('jwt', { session: false });
