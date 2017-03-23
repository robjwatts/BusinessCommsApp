const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../models');
const request = require('request');
const keys = require('./keys.js');


passport.serializeUser(function(user, done) {
  // console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log('deserializeUser');
  db.User.findById(user.id).then(function(user) {
    done(null, user);
  });
});


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('profile', profile, accessToken, refreshToken);
    db.User.findOne({where: {googleId: profile.id}}).then(function(user){
      if (!user) {
        db.User.create({email: profile.emails[0].value, refreshToken: refreshToken, accessToken: accessToken, googleId: profile.id, name: profile.displayName, role: 'base', profilePicUrl: profile.photos[0].value })
        .then(function(user) {
          console.log(user);
          done(null, user);
        }).catch(function(err) {
          console.log('err', err);
          done(err, false);
        });

      } else {
        done(null, user);
      }
    });
  })
);
        

// defaults: {role: "base", accessToken: accessToken, refreshToken: refreshToken}