var express = require("express");
var router = express.Router();
var logger = require("morgan");
var mongoose = require("mongoose");

var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

router.get("/", function(req, res) {
    Article.find({}, function(req, data){
      var hbsObject = {
              articles: data
      }
      console.log("I am working");
      res.render("index", hbsObject);
    })
  });
  router.get("/scrape", function(req, res) {
   Article.remove({"saved": false}, function(err, remove){
    if(err){
      throw err;
    }else{
      console.log("removed articles");
    }
   })
    request("http://www.echojs.com/", function(error, response, html) {
      var $ = cheerio.load(html);
      
      $("article h2").each(function(i, element) {
  
        var result = {};
  
        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");
  
        var entry = new Article(result);
  
        entry.save(function(err, doc) {
          if (err) {
            console.log(err);
          }
          else {
            
            // console.log(doc);
          }
        });
      });
      res.redirect("/");
    });
  });
  // This will get the articles we scraped from the mongoDB
  router.get("/articles", function(req, res) {
   
    // TODO: Finish the route so it grabs all of the articles
    Article.find({}, function(err, data){
  
  
    })
  
  });
  
  // This will grab an article by it's ObjectId
  router.get("/articles/:id", function(req, res) {
    Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(Article) {
      res.json(Article);
    })
    .catch(function(err) {
      res.json(err);
    });
  
  });
  
  // Create a new note or replace an existing note
  router.post("/articles/:id", function(req, res) {
    console.log("request: ", req.body)
      Note.create(req.body)
      .then(function(Note) {
        return Article.findOneAndUpdate({ _id: req.params.id }, { note: Note._id }, { new: true });
      })
      .then(function(Article) {
        res.json(Article);
      })
      .catch(function(err) {
        res.json(err);
      });
    
  
  });
  router.post("/api/articles/delete/:id", function(req, res) {
    Article.remove({"_id":req.params.id}, function(err, deleted){
      if(err){
        throw err;
      }else{
        // console.log("deleted: ", deleted);
      }
    })
    res.redirect("/"); 
  });
  router.put("/api/articles/save/:id", function(req, res) {
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

  module.exports = router;