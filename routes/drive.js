const methodOverride = require("method-override");
const google = require('googleapis');
const express = require("express");
const passport = require('passport');
const db = require('../models');
const middleware = require('../config/middleware');
const request = require("request");
// const Drive = require('../apis/drive.js');

const clientID = process.env.GOOGLE_CLIENT_ID || '705365889579-2s1out4g9bppocjs9kjrao1si22q71dt.apps.googleusercontent.com';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'SYr0asu1b3isKMx5jxm0zvmZ';

module.exports = function(app) {

	//call new router object
	const router = express.Router();
	
	router.use(methodOverride("_method"));

	router.use(middleware.authenticated);

	router.get("/api/drive", function(req, res, next) {
		console.log('getting drive data'); next(null);
		}, function(req, res, next) {
		listAllDriveFiles(req, res, req.user)
	});

	app.use("/", router);

}

//******** GOOGLE DRIVE API FUNCTIONS ********//

function listAllDriveFiles(req, res, user) {

    request.get("https://www.googleapis.com/drive/v3/files?key=AIzaSyDub963MueQRJHo-ZhmOsV_6-VlIEzT4n8&access_token=" + user.accessToken, function (e, r, files){
		if(e) {
			res.json(JSON.parse(e));
		} else {
			res.json(JSON.parse(files));
		}
	});
}