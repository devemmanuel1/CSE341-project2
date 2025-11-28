const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged in as <strong>${req.user.displayName || req.user.username}</strong> 
              | <a href="/logout">Logout</a>`);
  } else {
    res.send('Welcome to my Second Project! <a href="/login">Login with GitHub</a>');
  }
});

router.use("/users", require("./users"));
router.use('/courses', require('./courses'));

// GitHub login
router.get('/login', passport.authenticate('github', { scope: ['read:user'] }));

// EXACT CALLBACK URL THAT MATCHES YOUR .env
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;