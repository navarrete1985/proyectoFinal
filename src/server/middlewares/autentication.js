var jwt = require("jsonwebtoken");


/*======================================
                Verificar TOKEN
========================================*/
//Tendríamos que meter la información del usuario en el token...y comprobar las credenciales
//Del usuario....en caso de que sea correcto....seguimos de lo contrario enviamos respuesta al cliente

exports.verificaToken = function (req, res , next){

    var token = req.query.token;
    
    jwt.verify(token, process.env.SEED, (err, decoded ) =>{
        if(err){
            return res.status(401).json({
                ok:false,
                mensaje: 'error de autenticacion(token no valido)',
                errors:err
            })
        }
        next();//ya puede continuar una vez realizado la autenticacion
    })  
}


    
