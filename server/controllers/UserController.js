const mongoose = require("mongoose");
const User = require("../models/User").model;

let userController = {};

userController.getAll = (req, res) => {
    
    User.find({}).exec((err, users) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log('Recogido Listado de Usuarios');
        console.log(users);
        return res.send(users);
    })
    
}

userController.create = (req, res) => {
    
    let user = new User(req.body);
    console.log(req.body);
    console.log(user);
    
    user.save( err => {
        if (err) {
            
            // Añade la información de los errores
            var errors = [];
            for(var atr in err["errors"]){
                errors.push(err["errors"][atr]["message"]);
            }

            // console.log('Error al crear el usuario, err: ', err);
            // res.status(500).send('Error en la petición');
            return res.send({
                   error: true,
                   codigo: 300,
                   mensaje: 'Parametros requeridos incompletos',
                   errores: errors
              });;
        }
        console.log('Usuario creado satisfactoriamente');
        res.status = 200;
        return res.send({
                   error: false,
                   codigo: 200,
                   mensaje: 'respuesta del usuario'
              });
    })
    
}

module.exports = userController;
