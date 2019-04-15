const Menu = require("../models/Menu").model;
const Tools = require("../util/Tools");

let menuController = {};

menuController.getAll = (req, res) => {
    Menu.find({}).exec((err, menu) => {
        let response = Tools.response.get(err, menu);
        return res.status(response.status).json(response);
    })
}

menuController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Menu.find({ _id: id }).exec((err, menu) => {
        let response = Tools.response.get(err, menu);
        return res.status(response.status).json(response);
    })
}

menuController.create = (req, res) => {
    let menu = new Menu(req.body);
    
    menu.save( err => {
        let response = Tools.response.get(err, menu);
        return res.status(response.status).json(response);
    })
}

menuController.update = (req, res) => {
    Menu.update({_id:req.body._id}, {$set: req.body}).exec((err, menu) => {
        let response = Tools.response.get(err, menu);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return menuController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
    });
}

//mdAutenticacion.verificaToken,
menuController.delete = (req, res) => {
    var id = req.body._id;
    Menu.findOneAndDelete(id, (err, menu) => {
        let status = err ? 500 : !menu ? 400 : 200;
        let response = err ? err : menu ? menu : {message: `No existe el menu con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = menuController;