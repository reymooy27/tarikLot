
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./model/user');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id)
  .then(user => {
    done(null, user);
  })
  .catch(e => {
    done(new Error("Failed to deserialize an user"));
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback'
  },
    async (token, tokenSecret, profile, done) => {
      console.log(profile);
      const currentUser = await User.findOne({
        googleID: profile.id
      });

      if (!currentUser) {
        const newUser = await new User({
          username: profile._json.name,
          email: profile._json.email,
          googleID: profile._json.sub,
          profilePicture: profile._json.picture
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }else{
        done(null, currentUser);
      }
    }
  )
);