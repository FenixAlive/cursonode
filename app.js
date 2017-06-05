var express = require("express");
var app = express();
var bodyParser = require("body-parser")


app.set("view engine", "jade");

//manejador de archivos estaticos
app.use("/public", express.static("public"));

//manejar informacion que se recibe
app.use(bodyParser.json());//para application.json
app.use(bodyParser.urlencoded({extended:true})); //para informacion html

app.get("/", function(req,res){
  res.render("index");
    });

app.get("/login", function(req,res){
  res.render("login");
    });

app.post("/users", function(req, res){
  res.send("recibimos tus datos"+req.body.email)
    });
app.listen(8080);
