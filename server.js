// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = process.env.PORT || 8000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public")); //DO I NEED THIS?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./controllers/login_controller.js")(app);

// Initiate the listener.
app.listen(port);