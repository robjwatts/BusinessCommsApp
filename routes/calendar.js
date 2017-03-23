const methodOverride = require("method-override");
const express = require("express");
const passport = require('passport');
const db = require('../models');
const middleware = require('../config/middleware');
const Calendar = require('../apis/calendar.js');

module.exports = function(app) {

	//call new router object
	const router = express.Router();
	
	router.use(methodOverride("_method"));

	//requires that all endpoints after log-in require user to be logged in
	router.use(middleware.authenticated);

	//for now will send JSON to browser with user's drive data
	router.get("/api/calendar", function(req, res, next) {
		console.log('getting calendar data'); next(null);
		}, function(req, res, next) {
		Calendar.listAllEvents(req, res, req.user)
	});

	app.use("/", router);

}