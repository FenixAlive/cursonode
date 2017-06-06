var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user").User;


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
    User.find(function(err,doc){
    console.log(doc);
    res.render("login");
        });
    });

app.post("/users", function(req, res){
  var user = new User({email: req.body.email, password: req.body.password, confirmarpassword: req.body.confirmarpassword});
  console.log(user.confirmarpassword);
  user.save(function(err){
      if(err){
      console.log(String(err));
      }
  res.send("recibimos tus datos "+req.body.email)
  console.log(req.body.email);
  console.log(req.body.password);
      });
    });

app.listen(8080);
