// middleware/authenticate.js
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    return next();
  }
  res.status(401).json({ error: "You do not have access – please login with GitHub first" });
};

module.exports = { ensureAuthenticated };