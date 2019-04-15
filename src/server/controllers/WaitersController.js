const Waiter = require("../models/Waiters").model;
const Tools = require("../util/Tools");

let waiterController = {};

waiterController.getAll = (req, res) => {
    Waiter.find({}).exec((err, waiters) => {
        let response = Tools.response.get(err, waiters);
        return res.status(response.status).json(response);
    })
}

waiterController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Waiter.find({ _id: id }).exec((err, waiters) => {
        let response = Tools.response.get(err, waiters);
        return res.status(response.status).json(response);
    })
}

waiterController.create = (req, res) => {
    let waiter = new Waiter(req.body);
    
    waiter.save( err => {
        let response = Tools.response.get(err, waiter);
        return res.status(response.status).json(response);
    })
}

waiterController.update = (req, res) => {
    Waiter.update({_id:req.body._id}, {$set: req.body}).exec((err, waiter) => {
        let response = Tools.response.get(err, waiter);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return userController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
    });
}


//mdAutenticacion.verificaToken,
waiterController.delete = (req, res) => {
    var id = req.body._id;
    
    Waiter.findOneAndDelete(id, (err, waiter) => {
        let status = err ? 500 : !waiter ? 400 : 200;
        let response = err ? err : waiter ? waiter : {message: `No existe el camarero con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = waiterController;
