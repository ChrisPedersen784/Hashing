require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const md5 = require("md5");

const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/BikeRentalDB")

const securitySchema = new mongoose.Schema({
  email: String,
  password: String
});

const Security = mongoose.model("Security", securitySchema);


app.get("/", function(req, res){
  res.render("home");
});


app.post("/", function(req, res){
  res.render("home");
});

app.get("/loginSucces", function(req, res){
  res.render("loginSucces");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", function(req, res){
  const username = req.body.email;
  const password = md5(req.body.password);

  Security.findOne({email: username}, function(err, foundEmail){
    if(err){
      console.log(err);
    } else if(!foundEmail){
      res.redirect("/register");
    } else {
      if(foundEmail){
        if(foundEmail.password === password){
          res.redirect("/loginSucces");
        }
      }
    }
  });
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const username = req.body.email;
  const password = req.body.password;

  const newUser = new Security({
    email: username,
    password: md5(password)
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect("/loginSucces");
    }
  });
});




app.listen("3000", function(){
  console.log("Server is running on port 3000");
});
