const Allergen = require("../models/Allergens").model;
const Tools = require("../util/Tools");

let allergenController = {};

allergenController.getAll = (req, res) => {
    Allergen.find({}).exec((err, allergen) => {
        let response = Tools.response.get(err, allergen);
        return res.status(response.status).json(response);
    })
}

allergenController.find = (req, res) => {
    let id = req.params.id;
    Allergen.find({ _id: id }).exec((err, allergen) => {
        let response = Tools.response.get(err, allergen);
        return res.status(response.status).json(response);
    })
}

allergenController.create = (req, res) => {
    let allergen = new Allergen(req.body);
    
    allergen.save( err => {
        let response = Tools.response.get(err, allergen);
        return res.status(response.status).json(response);
    })
}

allergenController.update = (req, res) => {
    Allergen.updateOne({_id:req.body._id}, {$set: req.body}).exec((err, allergen) => {
        let response = Tools.response.get(err, allergen);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return allergenController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
    });
}

//mdAutenticacion.verificaToken,
allergenController.delete = (req, res) => {
    var id = req.body._id;
    Allergen.findOneAndDelete(id, (err, allergen) => {
        let status = err ? 500 : !allergen ? 400 : 200;
        let response = err ? err : allergen ? allergen : {message: `No existe el alérgeno con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

module.exports = allergenController;