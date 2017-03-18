const methodOverride = require("method-override");
const express = require("express");
const passport = require('passport');
const middleware = require('../config/middleware');
const routes = require('../apis');

module.exports = function(app) {

	//call new router object
	const router = express.Router();
	
	router.use(methodOverride("_method"));

	router.use(middleware.authenticated);

	router.get("/api/drive", function(req, res, next) {

	});

	app.use("/", router);

}