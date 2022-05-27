const router = require('express').Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' , successRedirect: '/'})
);

router.get("/auth/login/success", (req, res) => {
  if (req.user && req.session.passport.user) {
    res.status(200).json({
      user: req.user,
    });
  }else{
    res.status(400).json({message: 'No user authenticate'})
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json("User failed to authenticate");
});

router.get("/auth/logout", (req, res) => {
  req.logout();
  req.session.destroy()
  res.status(200).redirect('/');
});

module.exports = router