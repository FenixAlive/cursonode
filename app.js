var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");

app.set("view engine", "jade");

//manejador de archivos estaticos
app.use("/public", express.static("public"));

//manejar informacion que se recibe
app.use(bodyParser.json());//para application.json
app.use(bodyParser.urlencoded({extended:true})); //para informacion html
app.use(session({
  secret: "uc3ijf73jrbcx8w",
  resave: false,
  saveUninitialized: false
}));

app.get("/", function(req,res){
  console.log(req.session.user_id)
  res.render("index");
    });

app.get("/signup", function(req,res){
    User.find(function(err,doc){
    console.log(doc);
    res.render("signup");
        });
    });

app.get("/login", function(req,res){
    res.render("login");
    });

app.post("/users", function(req, res){
  var user = new User({username: req.body.username, email: req.body.email, password: req.body.password, confirmarpassword: req.body.confirmarpassword});
  console.log(user.confirmarpassword);
  user.save().then(function(usu){
  res.send("recibimos tus datos "+req.body.username)
  }), function(err){
        if(err){
        console.log(String(err));
        };
      };
});

app.post("/sessions", function(req,res){
    User.findOne({email:req.body.email, password:req.body.password},"username email",function(err,user){
  console.log(docs);
  req.session.user_id = user._id
  res.send( "<br> Bienvenid@ "+user.username + "<br><br> Tu email es: "+docs.email)

        })

    });    

app.listen(8080);
