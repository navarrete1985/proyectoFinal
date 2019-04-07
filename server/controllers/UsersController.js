const User = require("../models/Users").model;

let userController = {};

userController.getAll = (req, res) => {
    
    User.find({}).exec((err, users) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        return res.send({
            result: 200,
            data: users
        });
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
            //Error 400 bad request
            res.status = 400;
            return res.send({
                   result: false,
                   codigo: 300,
                   mensaje: 'Parametros requeridos incompletos',
                   errores: errors
              });;
        }
        res.status = 200;
        return res.send({
                   result: true,
                   codigo: 200,
                   mensaje: 'respuesta del usuario'
              });
    })
    
}

module.exports = userController;
