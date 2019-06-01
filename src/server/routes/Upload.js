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
const MenuModel = require('../models/Menu');
const OfferModel = require('../models/Offers');
const types = {
    'stablishments': {
        route: 'upload/stablishments',
        limit: 20,
        name: undefined,
        folder: true,
    },
    'user': {
        route: 'upload/users',
        limit: 1,
        name: 'id',
        folder: false,
    },
    'menu': {
        route: 'upload/menu',
        limit: 1,
        name: 'id',
        folder: false,
    },
    'offer': {
        route: 'upload/offer',
        limit: 1,
        name: 'id',
        folder: false,
    },
}

let uploadStorage = require('../util/UploadStorage');
let router = express.Router();

let storage;

let errorResponse = (resp, id, type) => {
    let message = `El ${type} con id ${id} no se ha encontrado en la base de datos`;
    console.error(message);
    return resp.status(404).json({error: message});
}

//Comprobación de los parámetros requeridos
let requiredParams = (req, resp, next) => {
    console.log('onParamsRequired');
    let validTypes = ['user', 'stablishments', 'menu', 'offer'];
    let params = req.params;
    console.log(params);
    if (params.type && validTypes.includes(params.type) && params.id) next();
    else {
        console.log('Faltan parámetros requeridos')
        return resp.status(400).json({error: 'Parámetros requeridos {params: {type: Strig[stablishments/users], _id: String}}'});
    }
}

//Comprobamos si el establecimiento o el usuario existe para continuar
let exist = (req, resp, next) => {
    console.log('onExist');
    let id = req.params.id;
    let type = req.params.type;
    switch(type) {
        case 'stablishments':
            StablishmentModel.findOne({_id: id}).exec((err, stablishment) => {
                if (err) {
                    return errorResponse(resp, id, type);
                }
                req.modelObject = stablishment;
                next();
            });
            break;
        case 'user':
            UserModel.findOne({_id: id}).exec((err, user) => {
                if (err) {
                    return errorResponse(resp, id, type);
                }
                req.modelObject = user;
                next();
            });
            break;
        case 'menu':
            MenuModel.findOne({_id: id}).exec((err, menu) => {
                if (err) {
                    return errorResponse(resp, id, type);
                }
                req.modelObject = menu;
                next();
            });
            break;
        case 'offer':
            OfferModel.findOne({_id: id}).exec((err, offer) => {
                if (err) {
                    return errorResponse(resp, id, type);
                }
                req.modelObject = offer;
                next();
            });
            break;
    }
}

//Configuración del storage para guardar el número de archivos y si es el usuario poner el id por como nombre defecto de este
let storageConfig = (req, resp, next) => {
    console.log(req.modelObject);
    console.log('onStorageConfig');
    storage = uploadStorage.array('files[]', types[req.params.type].limit);
    if (types[req.params.type].name !== undefined) types[req.params.type].name = req.params.id;
    console.log('Eooooooooo ', types[req.params.type].route);
    if (types[req.params.type].folder) req.params.folder = types[req.params.type].route + `/${req.params.id}`;
    else req.params.folder = types[req.params.type].route;
    console.log('Eooooooooo ', types[req.params.type].route);
    req.paramsType = types[req.params.type];
    next();
}

//Guardamos los archivos si todo ha ido guay
let upload = (req, resp, next) => {
    console.log('onUpload');
    storage(req, resp, err => {
        if (err) {
            return resp.status(400).json({error: true, uploadFiles: req.uploadFiles});
        }
        next();
    })
}

//Actualizamos el nombre de los archivos en nuestra base de datos
let save = async (req, resp) => {
    console.log('onSave');
    let type = req.params.type;
    let id = req.params._id;
    switch(type) {
        case 'stablishments':
            Object.keys(req.uploadFiles).forEach(file => req.modelObject.photo_url.push(`${req.paramsType.route}/${req.uploadFiles[file].filename}`));
            StablishmentModel.updateOne({_id: req.modelObject._id}, {$set: req.modelObject}).exec((err, stablishment) => {
                if (err) {
                    resp.status(500).json({error: true, result: err});
                }
            });
            break;
        case 'user':
        console.log('Usuario --> ', req.modelObject);
            Object.keys(req.uploadFiles).forEach(file => req.modelObject.photo_url = `${req.paramsType.route}/${req.uploadFiles[file].filename}`);
            UserModel.updateOne({_id: req.modelObject._id}, {$set: req.modelObject}).exec((err, user) => {
                if (err) {
                    resp.status(500).json({error: true, result: err});
                }
            });
            break;
        case 'menu':
            Object.keys(req.uploadFiles).forEach(file => req.modelObject.urlpdf = `${req.paramsType.route}/${req.uploadFiles[file].filename}`);
            MenuModel.updateOne({_id: req.modelObject._id}, {$set: req.modelObject}).exec((err, menu) => {
                if (err) {
                    resp.status(500).json({error: true, result: err});
                }
            });
            break;
        case 'offer':
            Object.keys(req.uploadFiles).forEach(file => req.modelObject.image = `${req.paramsType.route}/${req.uploadFiles[file].filename}`);
            OfferModel.updateOne({_id: req.modelObject._id}, {$set: req.modelObject}).exec((err, offer) => {
                if (err) {
                    resp.status(500).json({error: true, result: err});
                }
            });
            break;
    }
    resp.status(200).json({error: false, result: req.modelObject});
    console.log('Respuesta --> ', req.modelObject);
    return resp;
}

// router.post("/upload", uploadStorage.array('files[]', 20), upload.upload);
router.post("/upload/:type/:id", requiredParams, exist, storageConfig, upload, save);

module.exports = router;