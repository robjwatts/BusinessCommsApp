// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const db = require('./models');
const passport = require('passport');
const passportConfig = require('./config/passport');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const errorhandler = require('errorhandler');

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = process.env.PORT || 8000;

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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
require("./routes/drive.js")(app);
// require("./routes/calendar.js")(app);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

db.sequelize.sync({ force: true }).then(function() {

  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});