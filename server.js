// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var Article = require("./models/article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3001;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
//mongoose.connect("mongodb://localhost/nytimes");
// mongoose.connect("mongodb://localhost/nytreact");
mongoose.connect ("mongodb://heroku_bp3dcpcg:f1ulu75ogk5b9a2e3g0sj38nmp@ds127531.mlab.com:27531/heroku_bp3dcpcg");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our saved articles.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).sort([
    ["date", -1]
  ]).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  
  console.log("req.body");
  console.log(req.body.title);
  // Here we'll save the location based on the JSON input.
 
  Article.create({
    title: req.body.title,
    url: req.body.url,
    date: req.body.date
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {

      res.redirect("/api");

      
    }
  });
});


  // delete an article from database
  app.post('/api/delete', function(req, res){
    console.log(req.body);
    Article.findOneAndRemove({'title': req.body.title}, function(err){
      if(err){
        console.log("DELETE ERROR", err)
      } else{
        res.redirect("/api");

      }
    });

  });


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});