var jwt = require("jsonwebtoken");


/*======================================
                Verificar TOKEN
========================================*/
//Tendríamos que meter la información del usuario en el token...y comprobar las credenciales
//Del usuario....en caso de que sea correcto....seguimos de lo contrario enviamos respuesta al cliente

exports.verificaToken = function (req, res , next){

    //Recogemos la cabecera authorization donde va alojado el token
    let auth = req.headers.authorization;
    //Recogemos el string de token que va después de Bearer
    let token = auth ? auth.split(" ")[1] : undefined;
    
    jwt.verify(token, process.env.SEED, (err, decoded ) =>{
        if(err){
            return res.status(401).json({
                ok:false,
                mensaje: 'error de autenticacion(token no valido)',
                errors:err
            })
        }
        req.currentUser = decoded;
        next();//ya puede continuar una vez realizado la autenticacion
    })  
}