/*
Antes de todo comprobamos con el middleware el token
1- Comprobación de los parámetros requeridos.
2- Comprobación de que el usuario o el establecimiento existen.
3- Preconfiguración de cantidad de archivos que puede subir el usuario
4- Salvamos los archivos en su correspondiente ruta
*/

const express = require("express");
const UserModel = require("../models/Users").model;
const StablishmentModel = require("../models/Establishment").model;

let uploadStorage = require('../util/UploadStorage');
let router = express.Router();

let storage = uploadStorage.array('files[]', 20);

let requiredParams = (req, resp, next) => {
    console.log('onParamsRequired');
    let validTypes = ['user', 'stablishment'];
    let params = req.params;
    console.log(params);
    if (params.type && validTypes.includes(params.type) && params.id) next();
    else {
        console.log('Faltan parámetros requeridos')
        return resp.status(400).json({error: 'Parámetros requeridos {params: {type: Strig[stablishment/users], _id: String}}'});
    }
}

//Comprobamos si el establecimiento o el usuario existe para continuar
let exist = (req, resp, next) => {

}

let upload = (req, resp, next) => {
    console.log('onUpload');
    storage(req, resp, err => {
        console.log(err);
        if (err) {
            return resp.status(400).json({error: true, uploadFiles: req.uploadFiles});
        }
        // return resp.status(200).json({error: false, uploadFiles: req.uploadFiles});
        next();
    })
}

let save = async (req, resp) => {
    console.log('onSave');
    let type = req.params.type;
    let id = req.params._id;
    switch(type) {
        case 'stablishment':
            let stablishment = await StablishmentModel.find({_id: id}).exec();
            if (stablishment) {
                Object.keys(req.uploadFiles).forEach(file => stablishment.photo_url.push(`/upload/stablishments/${stablishment._id}/${file.originalname}`));
                let result = await StablishmentModel.update({_id: stablishment._id}, {$set: stablishment}).exec();
                return resp.status(200).json({error: false, uploadFiles: req.uploadFiles, result});
            }
            break;
        case 'user':
            let user = await UserModel.find({_id: id}).exec();
            if (user) {
                Object.keys(req.uploadFiles).forEach(file => user.photo_url = `/upload/users/${file.originalname}`);
                let result = await StablishmentModel.update({_id: stablishment._id}, {$set: stablishment}).exec();
                return resp.status(200).json({error: false, uploadFiles: req.uploadFiles, result});
            }
            break;
    }
}

// router.post("/upload", uploadStorage.array('files[]', 20), upload.upload);
router.post("/upload/:type/:id", requiredParams, upload, save);

module.exports = router;