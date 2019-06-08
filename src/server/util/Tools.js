const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var fs = require("fs");
var mkdirp = require('mkdirp');

const validateUrlSchema = new Schema({
    url: {
        type: String,
        validate: {
            validator: function(value) {
                 return validateUrl(value);
            },
            message: props => `${props.value} no es un formato de url válido.`
        }   
    }
});

function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function validateHex(value, length) {
    let regexp = new RegExp(`[0-9A-Fa-f]{${length}}`, 'g');
    return regexp.test(value);
}

function createDir(directorio,carpeta,id){
    mkdirp(directorio +carpeta + id, function (err) {
        // path exists unless there was an error
        if (err) {
            console.log("error al crear directorio");
        } else {
            console.log("directorio creado");
        }
    });
}

function getResponse(err, data, post = false) {
    let status = !err ? 200 : 400;
    let response = !err ? data : err;
    let error = err ? true : false;
    return {
        status,
        result: status === 200 ? true : false,
        error,
        response
    };
}

function checkRequiredParas(params, object) {
    let notFound = [];
    if (!Array.isArray(params)) throw new ExceptionRequiredParams('El formato de los parámetros requeridos tiene que ser un array');
    if (typeof object !== 'object') throw new ExceptionRequiredParams('Necesario un objeto como parámetro con los siguientes atributos,', params);
    params.forEach(param => {
        if (!object.hasOwnProperty(param)) notFound.push(param);
    })
    if (notFound.length > 0) throw new ExceptionRequiredParams('Parámetros requeridos no encontrados', notFound);
}

/**
 * @return {string}
 */
function ExceptionRequiredParams(message='No se han pasado los parámetros requeridos', params=[]) {
    this.message = message;
    if (params.length > 0) this.params = params;
    return `${this.message} [${params.toString()}]`;
}

module.exports = {
    validator: {
        validateUrl,
        validateHex,
        validateUrlSchema
    },
    response: {
        get: getResponse
    },
    createDir,
    checkRequiredParas
}