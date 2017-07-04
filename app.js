var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app")
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override")
var formidable = require("express-form-data");
var RedisStore = require("connect-redis")(session);
var http = require("http");
var server = http.Server(app);
var realtime = require("./realtime");

var sessionMiddleware = session({
    store: new RedisStore({//irian el puerto y la configuracion
    }),
    secret: "mainSecretWordFenixAlive"    
});

realtime(server,sessionMiddleware);

app.set("view engine", "jade");

//manejador de archivos estaticos
app.use("/public", express.static("public"));

//manejar informacion que se recibe
app.use(bodyParser.json());//para application.json
app.use(bodyParser.urlencoded({extended:true})); //para informacion html


app.use(sessionMiddleware);
//para manejar put y delete
app.use(methodOverride("_method"))

app.use(formidable.parse({keepExtensions: true}));

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
  res.send("<br><a href='/login'>Entrar a tu cuenta</a>")
  }), function(err){
        if(err){
        console.log(String(err));
        };
      };
});

app.post("/sessions", function(req,res){
    User.findOne({email:req.body.email, password:req.body.password},function(err,user){
        try{
        if(user._id){
          req.session.user_id = user._id;
          res.redirect("/app");
          }else{
          res.redirect("/login");
          }
        }catch(err){
          res.send("hay un error, revisa nuevamente la información ingresada porfavor.");
          console.log(err);
        }
  if(err){
  console.log(err);
  }
        })
    });    
app.use("/app",session_middleware);
app.use("/app",router_app);

server.listen(8080);
