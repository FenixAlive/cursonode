var express = require("express");

var app = express();

app.set("view engine", "jade");

app.get("/", function(req,res){
  res.render("hola", {hola: "Hola Luis Angel"})

    });
app.listen(8080);
