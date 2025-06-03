function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Login required' });
}

module.exports = { ensureAuthenticated };
