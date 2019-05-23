const User = require("../models/Users").model;
const Tools = require("../util/Tools");
var bcrypt = require('bcrypt');
var Pusher = require('pusher');

var path = require("path");
var os = require("os");

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'eu',
  encrypted: true
});

let userController = {};

userController.getAll = (req, res) => {

    User.find({}).exec((err, users) => {
        let response = Tools.response.get(err, users);
        // pusher.trigger('my-channel', 'my-event', {
        //   users
        // });
        return res.status(response.status).json(response);
    })
}

userController.getUserPagination = (req, res) => {
    // const myCustomLabels = {
    //     totalDocs: 'itemCount',
    //     docs: 'itemsList',
    //     limit: 'perPage',
    //     page: 'currentPage',
    //     nextPage: 'next',
    //     prevPage: 'prev',
    //     totalPages: 'pageCount',
    //     pagingCounter: 'slNo'
    // };
    
    const options = {
        page: req.body.page || 4,
        limit: req.body.limit || 10,
        // customLabels: myCustomLabels
    };
    User.paginate({}, options, (err, result) => {
        return res.status(!err ? 200 : 400).json(result);
    });
}

userController.find = (req, res) => {
    let id = req.params.id;
    User.findOne({ _id: id }).exec((err, users) => {
        let response = Tools.response.get(err, users);
        return res.status(response.status).json(response);
    })
}

userController.create = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let user = new User(req.body);
    console.log(user);
    user.save( err => {
        let response = Tools.response.get(err, user);
        return res.status(response.status).json(response);
    })
}

/*======================================
                Verificar TOKEN
========================================*/



userController.update = (req, res) => {
    //En caso de que actualicemos la contraseña....la encriptamos
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
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
    var id = req.body.id;
    console.log(id);
    User.findOneAndDelete({ _id: id }, (err, userDelete) => {
        let status = err ? 500 : !userDelete ? 400 : 200;
        let response = err ? err : userDelete ? userDelete : {message: `No existe el usuario con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = userController;