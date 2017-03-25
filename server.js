// Load Twilio configuration from .env config file - the following environment
// variables should be set:
process.env.TWILIO_ACCOUNT_SID
process.env.TWILIO_API_KEY
process.env.TWILIO_API_SECRET
process.env.TWILIO_CONFIGURATION_SID


// Dependencies
//dotenv(weird syntax, i know, but it works --RW)
///this line also needs to be commented out when it comes to be deployed on heroku!
require('dotenv').load();
//others
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const db = require('./models');
const passport = require('passport');
const passportConfig = require('./config/passport');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const errorhandler = require('errorhandler');
const http = require('http');
const path = require('path');
const AccessToken = require('twilio').AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const randomUsername = require('./config/randos');

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = process.env.PORT || 8000;

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var hbs = exphbs.create({
    defaultLayout: 'main',

    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', port);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy

//need sessions to persist state of user
app.use(session({
  secret: '3or8h1o2h1o28u12o38j12',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require("./controllers/authentication.js")(app);
require("./controllers/home-controllers.js")(app, hbs);
require("./routes/drive.js")(app);
require("./routes/calendar.js")(app);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

db.sequelize.sync({ force: true }).then(function() {

  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});


///FROM THIS POINT FORWARD IS TWILIO VIDEO CHAT CODE/////////
/////////////////
/////////////////

/*
Generate an Access Token for a chat application user - it generates a random
username for the client requesting a token, and takes a device ID as a query
parameter.
*/
app.get('/token', function(request, response) {
    var identity = randomUsername();
    
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

        // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();
    grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});
