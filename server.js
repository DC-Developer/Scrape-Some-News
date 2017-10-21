var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.get("/", function(req, res) {
  Article.find({}, function(req, data){
    var hbsObject = {
            articles: data
    }
    console.log("I am working");
    res.render("index", hbsObject);
  })
});
//be sure to add parameters to the remove() so that it only deletes
//the articles with the default save value of false
app.get("/scrape", function(req, res) {
 Article.remove({"saved": false}, function(err, remove){
  if(err){
    throw err;
  }else{
    console.log("removed articles");
  }
 })
  request("http://www.echojs.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          
          // console.log(doc);
        }
      });
    });
    res.redirect("/");
  });
  
  
  // res.send("Scrape Complete");

});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
 
  // TODO: Finish the route so it grabs all of the articles
  Article.find({}, function(err, data){


  })

});

// This will grab an article by it's ObjectId
app.get("/articles/:id", function(req, res) {


  // TODO
  // ====

  // Finish the route so it finds one article using the req.params.id,

  // and run the populate method with "note",

  // then responds with the article with the note included
Article.find({"_id": req.params.id}, function(err, found){
  if(err){
    throw(err);
  }else{
    res.send(found);
  }
})
.populate("note")
.exec(function(err, doc){
  if(err){
    throw(err);
  }else{
    res.send(doc)
  }
})

});

// Create a new note or replace an existing note
app.post("/articles/:id", function(req, res) {


  // TODO
  // ====

  // save the new note that gets posted to the Notes collection

  // then find an article from the req.params.id

  // and update it's "note" property with the _id of the new note
  var newNote = new Note(req.body);

  Note.save(function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    }
    // Or log the doc
    else {
      console.log(doc);
    }
  })
  Article.find({"_id": req.params.id}, function(err, found){
    if(err){
      res.send(err);
    }else{
      res.send(found);
    }
  })
  .update({"note": Schema.Types.ObjectId})
  

});
//take out the delete button for the scraped articles and only
//apply it for the saved articles. 
app.post("/api/articles/delete/:id", function(req, res) {
  Article.remove({"_id":req.params.id}, function(err, deleted){
    if(err){
      throw err;
    }else{
      // console.log("deleted: ", deleted);
    }
     
  })
  res.redirect("/"); 
});
app.put("/api/articles/save/:id", function(req, res) {
  //findOneAndUpdate does find() and update() at the same time. You pass in another object
  // {$set: {"":""}} and update the document
  Article.findOneAndUpdate({"_id":req.params.id},{$set: {"saved": true}}, function(err, data){
    if(err){
      console.log("you couldnt save");
      throw err;
    }else{
      console.log("found");
      var hbsObject={
        articles: data
      }
      res.render("index", hbsObject);

    }
  //taking out the redirect here made the save button work!
  })
  
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
