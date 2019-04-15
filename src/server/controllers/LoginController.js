const User = require("../models/Users").model;
const Tools = require("../util/Tools");
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

let loginController = {};


loginController.login = (req, res) => {
   var body = req.body;
   
   User.findOne({email:body.email},(err, userDB)=>{
       if(err){
            return res.status(500).json({
                ok:false,
                mensaje:"error al buscar usuario",
                error: err
            })   
       }
       
       
       if(!userDB){
            return res.status(400).json({
                ok:false,
                mensaje:"credenciales incorrectas email",
                error: err
            })   
       }
       
       if(!bcrypt.compareSync(body.password,userDB.password)){
           return res.status(400).json({
                ok:false,
                mensaje:"credenciales incorrectas pass",
                error: err
            })   
       }
       
       //crear un token
       userDB.password = ":)";
       var token = jwt.sign({ user: userDB}, process.env.SEED,{ expiresIn: 14400 }) //4 horas
       
       
        res.status(200).json({
            ok:true,
            mensaje:"login post",
            body:body,
            token:token
        }) 
       
   })
   
   
}

module.exports = loginController;