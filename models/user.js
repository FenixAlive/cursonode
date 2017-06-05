// para iniciar la base de datos sudo systemctl start mongodb.service
// para iniciar teclear mongo
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/node");

var user_schema = new Schema({
  name: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date
    });

user_schema.virtual("confirmarpassword").get(function(){
  return this.pc;
  }).set(function(password){
    this.pc = password;
    })

var User = mongoose.model("User",user_schema);

module.exports.User = User;
//Tipos de datos:
//
//String
//Number
//Date
//Buffer
//Boolean
//Mixed
//Objectid
//Array
