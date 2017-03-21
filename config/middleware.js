const googleapis = require('googleapis');

exports.authenticated = function(req, res, next) {
  console.log('in is authenticated', req.isAuthenticated());
  if (req.isAuthenticated()) {
  	// console.log(req.user);
    next();
  } else {
    res.redirect('/login');
  }
};

exports.destroySession = function(req, res, next) {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};


//the following may or may not be necessary given our use of passport...
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    req.authClient = new googleapis.auth.OAuth2(clientID, clientSecret);
    req.authClient.credentials = req.session.googleCredentials;
    return next();
  } else {
    res.redirect('/login');
  }
}