const googleapis = require('googleapis');

const clientID = process.env.GOOGLE_CLIENT_ID || '705365889579-2s1out4g9bppocjs9kjrao1si22q71dt.apps.googleusercontent.com';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'SYr0asu1b3isKMx5jxm0zvmZ';

exports.authenticated = function(req, res, next) {
  console.log('in is authenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
  	console.log(req.user);
    next();
  } else {
    res.redirect('/');
  }
};

exports.destroySession = function(req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.authClient = new googleapis.auth.OAuth2(clientID, clientSecret);
    req.authClient.credentials = req.session.googleCredentials;
    return next();
  } else {
    res.redirect('/login');
  }
}