// load environment variables
require('dotenv').config();

// grab our dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// configure our application

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to the database
mongoose.connect(process.env.DB_URI);

// use bodyParser to grab info from a form
app.use(bodyParser.urlencoded({extended: true}));

// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
