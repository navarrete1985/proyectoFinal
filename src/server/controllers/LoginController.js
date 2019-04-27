const User = require("../models/Users").model;
const Tools = require("../util/Tools");
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

let loginController = {};


loginController.login = (req, res) => {
    var body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "error al buscar usuario",
                error: err
            })
        }


        if (!userDB || !bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: "credenciales incorrectas email",
                error: err
            })
        }
        userDB.token = '';
        var token = jwt.sign({ user: userDB }, process.env.SEED)
        userDB.token = token;

        if (body.type == "admin") {
            //camarero
        } else {
            User.update({ _id: userDB._id }, { $set: userDB }).exec((err, user) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "error al actualizar token de usuario",
                        error: err
                    })
                }
            });

        }
        res.status(200).json({
            ok: true,
            mensaje: "login post",
            user: userDB,
            token: token
        })

    })

}

loginController.logout = (req, res) => {

    console.log("Id usuario", req.body._id);
    User.update({_id: req.body._id}, {$set: {token: ''}}).exec((err, user) => {
        let status = !err ? 200 : 400;
        return res.status(status).json({
            status,
            result: status === 200 ? true : false
        })
    })

}

module.exports = loginController;