const User = require("../models/Users").model;
const Tools = require("../util/Tools");

let userController = {};

userController.getAll = (req, res) => {
    User.find({}).exec((err, users) => {
        let response = Tools.response.get(err, users);
        return res.status(response.status).json(response);
    })
}

userController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    User.find({ _id: id }).exec((err, users) => {
        let response = Tools.response.get(err, users);
        return res.status(response.status).json(response);
    })
}

userController.create = (req, res) => {
    let user = new User(req.body);
    user.save( err => {
        let response = Tools.response.get(err, user);
        return res.status(response.status).json(response);
    })
}

userController.update = (req, res) => {
    User.update({_id:req.body._id}, {$set: req.body}).exec((err, user) => {
        let response = Tools.response.get(err, user);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return userController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
        
    });
}


//mdAutenticacion.verificaToken,
userController.delete = (req, res) => {
    var id = req.body._id;
    User.findOneAndDelete({ id: id }, (err, userDelete) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una usuario  con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            Usuario: userDelete
        });

    });
    
    
    
    

};

module.exports = userController;
