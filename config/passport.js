const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../models');


passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('deserializeUser');
  db.User.findById(user.id).then(function(user) {
    done(null, user);
  });
});


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '705365889579-2s1out4g9bppocjs9kjrao1si22q71dt.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'SYr0asu1b3isKMx5jxm0zvmZ',
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('profile', profile);
    db.User.findOne({where: {googleId: profile.id}}).then(function(user){
      if (!user) {
        db.User.create({refreshToken: refreshToken, accessToken: accessToken, googleId: profile.id, name: profile.displayName, role: 'base' })
        .then(function(user) {
          done(null, user);
        }).catch(function(err) {
          console.log('err', err);
          done(err, false);
        });

      } else {
        done(err, found ? user : false);
      }
    });
  })
);
        

// defaults: {role: "base", accessToken: accessToken, refreshToken: refreshToken}