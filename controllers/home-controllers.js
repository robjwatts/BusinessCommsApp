const methodOverride = require("method-override");
const express = require("express");
const passport = require('passport');
const db = require('../models');
const middleware = require('../config/middleware');
const serviceAccount = require('../apis/gsuite-service-account.js');

module.exports = function(app, hbs) {

	//call new router object
	const router = express.Router();
	
	router.use(methodOverride("_method"));

	router.use(middleware.authenticated);

	router.get("/home", function(req, res, next) {
	  	console.log('going home'); next(null);

// 	}, middleware.authenticated, function(req, res, next) {
// 		//do something with service account here
// 		next(null); 
// 	}, function(req, res, next) {
// 	  	res.render("index", {user: req.user});
// 	});

		}, function(req, res, next) {

			let promises = [ 
				getAllBlogs(),
				getAllEvents(),
			]

			Promise.all(promises).then((data)=>{

				var blogData = [], eventData = [];

				if(data[0][0]){
					blogData = data[0];
					
				}

				if(data[1][0]){
					eventData = data[1];
					
				}

				// console.log(blogData)

				var helpers={
			        compare: function(id1, operator, id2, options){
			        	if(id1==id2) {
						    return options.fn(this);
						} else {
						    return options.inverse(this);
						}
					}
				}

				res.render("userHome", {
			    	current_user: req.user,
			    	events: eventData,
			    	blogs: blogData,
			    	helpers,
					partials: hbs.getPartials({precompiled: true}).then((partials)=>{
						// console.log(partials);
					})
				});
			}).catch((err)=>{console.log(err)});

	});
 
  	router.post("/api/blogs/new", (req,res,next)=>{
 		// Take the request...
	    var blog = req.body;

	    // console.log(req.user.id);

	    // Then add the blog to the database using sequelize
	    db.Blog.create({
	      userId: req.user.id,
	      blogTitle: blog.blog_title,
	      blogText: blog.blog_text,
	      likes: 0,
	      likedBy: null
	    }).then((success)=>{

	    	res.redirect("/home");
	    });
 	});

 	router.post("/api/events/new", (req,res)=>{
        // Take the request...
        var event = req.body;
        // Then add the blog to the database using sequelize
        db.UpcomingEvents.create({
          userID: req.user.id,
          title: event.title,
          description: event.description,
          timeRange: event.timeRange,
          location: event.location
        }).then((success)=>{
        	res.redirect("/home");
    	})
    });
    
    router.put("/api/blogs/update", (req, res)=>{
        // db.Blog.update
        var blog = req.body;
        console.log("put body", blog);

        db.Blog.update({
            blogTitle: blog.blog_title,
            blogText:blog.blog_text
        },{where:{id:blog.id}
        }).then((success)=>{
        	res.redirect("/home");
        });
    });
    
    router.delete("/api/blogs/delete/:id", (req, res)=>{
  
        db.Blog.destroy({
            where:{ id: req.params.id}
        })
        	
        // res.redirect("/home");
        
    });

    router.delete("/api/events/delete/:id", (req, res)=>{
       
        db.UpcomingEvents.destroy({
            where:{userID: req.params.id}
        }).then((success)=>{
        	// res.redirect("/home");
        });
    });

 	app.use("/", router);

}

var getAllBlogs = function() {

	return new Promise((resolve, reject)=>{

		// db.Blog.belongsTo(db.User, {foreignKey: 'userId'});

		db.User.hasMany(db.Blog);
		db.Blog.belongsTo(db.User);

		db.Blog.findAll({include: [{
	        model: db.User,
	        required: true
	    }]

		}).then((blogs)=>{
			// console.log("success", blogs);
	    	resolve(blogs);
	          
	 	}).catch((err)=>{
	 		if(err) {reject(err)}
		});
	});
}

var getAllEvents = function() {

	return new Promise((resolve, reject)=>{

		// db.UpcomingEvents.belongsTo(db.User, {foreignKey: 'userId'})

		db.User.hasMany(db.UpcomingEvents);
		db.UpcomingEvents.belongsTo(db.User);

		db.UpcomingEvents.findAll({include: [{
	        model: db.User,
	        required: true
	    }]
		}).then((events)=>{
	    	// console.log('success',events);
	    	resolve(events);
	 	}).catch((err)=>{
	 		if(err) {reject(err)}
		});    
	});

}