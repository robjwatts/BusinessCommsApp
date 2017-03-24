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
 
 	router.get("/api/events", (req,res)=>{
 		connection.selectAll().then((events)=>{
 			res.render("userHome", {events:events}, [partials]);
 		}).catch((err)=>{
 			res.sendStatus(503).json(err);
 		});
 		
 	});

 	router.post("/api/events/new", (req,res)=>{
 		connection.insertOne(req.body.burger_name).then((success)=>{
 			res.redirect("/index");
 		}).catch((err)=>{
 			res.sendStatus(503).json(err);
 		});
 	});

 	router.put("/api/events/update", (req, res)=>{
 		connection.updateOne(req.body.id).then((success)=>{
 			res.redirect("/index");
 		}).catch((err)=>{
 			res.sendStatus(503).json(err);
 		});
 	});

 	router.delete("api/events/delete", (req, res)=>{
 		connection.deleteOne(req.body.id).then((success)=>{
 			res.redirect("/index");
 		}).catch((err)=>{
 			res.sendStatus(503).json(err);
 		});

 	app.use("/", router);

}