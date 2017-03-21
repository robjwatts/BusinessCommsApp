const methodOverride = require("method-override");
const express = require("express");
const passport = require('passport');
const db = require('../models');
const middleware = require('../config/middleware');
const serviceAccount = require('../apis/gsuite-service-account.js');

module.exports = function(app) {

	//call new router object
	const router = express.Router();
	
	router.use(methodOverride("_method"));

	router.get("/", (req, res)=>{
		res.redirect("/login");
	});

	router.get("/home", function(req, res, next) {
	  console.log('going home'); next(null);
	}, middleware.authenticated, function(req, res, next) {
		serviceAccount.getServiceAccessToken(); next(null); }, function(req, res, next) {
	  	res.render("index", {user: req.user});
	});

	router.get("/login", (req,res)=>{
		res.render("login");
	});

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve
	//   redirecting the user to google.com.  After authorization, Google
	//   will redirect the user back to this application at /auth/google/callback
	router.get('/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
	   'https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file',
	   'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/drive.metadata',
	   'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.photos.readonly',
	   'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive.metadata.readonly'], access_type: 'offline' }));

	// GET /auth/google/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	router.get('/auth/google/callback',

	passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
 
	    res.redirect('/home');
	});

 	app.use("/", router);

}