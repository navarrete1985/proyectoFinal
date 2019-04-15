const Offer = require("../models/Offers").model;
const Tools = require("../util/Tools");

let offerController = {};

offerController.getAll = (req, res) => {
    Offer.find({}).exec((err, offer) => {
        let response = Tools.response.get(err, offer);
        return res.status(response.status).json(response);
    })
}

offerController.find = (req, res) => {
    // Obtener el :id
    let id = req.params.id;
    Offer.find({ _id: id }).exec((err, offer) => {
        let response = Tools.response.get(err, offer);
        return res.status(response.status).json(response);
    })
}

offerController.create = (req, res) => {
    let offer = new Offer(req.body);
    
    offer.save( err => {
        let response = Tools.response.get(err, offer);
        return res.status(response.status).json(response);
    })
}

offerController.update = (req, res) => {
    Offer.update({_id:req.body._id}, {$set: req.body}).exec((err, offer) => {
        let response = Tools.response.get(err, offer);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return offerController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
    });
}

//mdAutenticacion.verificaToken,
offerController.delete = (req, res) => {
    var id = req.body._id;
    
    Offer.findOneAndDelete(id, (err, offer) => {
        let status = err ? 500 : !offer ? 400 : 200;
        let response = err ? err : offer ? offer : {message: `No existe la oferta con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = offerController;