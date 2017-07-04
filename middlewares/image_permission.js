var Imagen = require("../models/imagenes")

module.exports = function(image,req,res){
          //true si tiene permisos
          //false no tiene
          if(req.method === "GET" && req.path.indexOf("edit")<0){
          //ver la imagen
            return true;
        }
    if(typeof image.creator == "undefined") return false;

          if(image.creator._id.toString()== res.locals.user._id){
          // es el dueño de la imagen
            return true;
          }
          return false;
}
