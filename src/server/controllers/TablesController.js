const Table = require("../models/Tables").model;
const Tools = require("../util/Tools");

let tableController = {};

tableController.getAll = (req, res) => {
    Table.find({}).exec((err, tables) => {
        let response = Tools.response.get(err, tables);
        return res.status(response.status).json(response);
    })
}

// tableController.find = (req, res) => {
//     let uuid = req.params.establishmentId;
//     Table.find({ uuid: uuid }).exec((err, tables) => {
//         let response = Tools.response.get(err, tables);
//         return res.status(response.status).json(response);
//     })
// }

tableController.find = (req, res) => {
    let establishmentId = req.params.uuid;
    console.log(req.params)
    console.log("el estable")
    console.log(establishmentId)
    Table.find({ establishmentId: establishmentId }).exec((err, tables) => {
        let response = Tools.response.get(err, tables);
        return res.status(response.status).json(response);
    })
}

tableController.create = (req, res) => {
    let table = new Table(req.body);
    
    table.save( err => {
        let response = Tools.response.get(err, table);
        return res.status(response.status).json(response);
    })
}

tableController.update = (req, res) => {
    console.log("LA PUTA MADRE",req.body);
    Table.update({establishmentId:req.body.establishmentId}, {$set: req.body}).exec((err, table) => {
        let response = Tools.response.get(err, table);
        if (response.status === 200) {
            req.params.id = req.body._id;
            return tableController.find(req, res);
        }else {
            return res.status(response.status).json(response);    
        }
    });
}

//mdAutenticacion.verificaToken,
tableController.delete = (req, res) => {
    var id = req.params.id;
    Table.findByIdAndRemove(id, (err, table) => {
        let status = err ? 500 : !table ? 400 : 200;
        let response = err ? err : table ? table : {message: `No existe la mesa con el id: ${id}`};
        
        return res.status(status).json({
            status,
            result: status === 200 ? true : false,
            response
        })
    });
};

tableController.change_state = async (req, res) => {
    let params = req.body.params;
    let found = false;
    try {
        Tools.checkRequiredParas(['establishment_id', 'table_id', 'new_state', 'user_id'], params);
        let tablesList = await Table.findOne({establishmentId: params.establishment_id}).exec();
        if (tablesList === null) throw `No se ha encontrado mesas del establecimiento ${params.establishment_id}`;
        tablesList.section.some(section => {
            section.tables.some(table => {
                if (table._id === params.table_id) {
                    table.state = params.new_state;
                    table.user_id = params.user_id;
                    found = true;
                }
                return found;
            })
            return found;
        });

        if (found) next();
        else {
            res.status(400).json({
                status: 400,
                error: true,
                response: `Mesa ${params.table_id} no encontrada en el establecimiento ${params.establishment_id}`
            })
        }
    }catch(error) {
        res.status(400).json ({
            status: 400,
            error: true,
            response: error
        })
    }
    
}

module.exports = tableController;