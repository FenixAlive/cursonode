// para iniciar la base de datos sudo systemctl start mongodb.service
// para iniciar teclear mongo
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/node");

var esex = ["M","F"];

var emailmatch = [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Hay un problema con el correo, revisa si esta bien escrito"]

var password_validation = {
	validator: function(p){
		return this.confirmarpassword == p;
	},
	message: "la contrase�a no fue la misma, digitalas nuevamente"
 }


var user_schema = new Schema({
  name: String,
  username: {type: String, required: true, maxlength: [50,"Tu username puede ser maximo de 50 caracteres"]},
  password: {type: String, minlength:[8,"Elige una contraseña de minimo 8 caracteres"], validate: password_validation},
  age: {type: Number, min:[12, "tienes que tener minimo 12 años de edad"], max:[125, "Si en verdad tienes esa edad mandame un mail para darte acceso"]},
  email: {type: String, required: "el correo es obligatorio", match: emailmatch},
  date_of_birth: Date,
  sex:{type: String, enum: {values: esex, message: "M para masculino y F para Femenino"}}
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
