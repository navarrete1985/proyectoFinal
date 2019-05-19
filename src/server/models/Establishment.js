//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;

const LONGITUD_MAXIMA = 20;

//Creamos el esquema de nuestro modelo de datos
const EstablishmentSchema = new Schema({
    description: {
        type: String,
    },
    image_logo: {
        type: String,
    },
    email: {
        type: String,
    },
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    website: {
        type: String,
    },
    phone: {
        type: String,
    },
    location: {
        lat:  Schema.Types.Decimal128,
        long: Schema.Types.Decimal128
    },
    name: {
        type: String,
        required: true
    },
    ocupation: {
        type: Number,
        default: 0
    },
    offers: [Schema.Types.ObjectId],
    photo_url: [{type: String}],
    uuid: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.validateHex(value, LONGITUD_MAXIMA);
            },
            message: props => `${props.value} no es un formato hexadecimal válido, necesario ${LONGITUD_MAXIMA} caractéres.`
        }
    }
});

const Establishment = mongoose.model("Establishment",EstablishmentSchema);

module.exports = {
    model: Establishment
};

/*
    "description": "Restaurante 1",
    "image_logo": {
        "url": "http://www.canadacoffee.es/img/gluten.png%22%7D"
    },
    "location": {
        "lat":  40.7127837,
        "long": -74.0059413
    },
    "name": "Restaurante de Nueva York",
    ocupation: 30,
    offers: [],
    photo_url: [],
    uuid: ""
*/


