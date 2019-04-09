//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;


//Creamos el esquema de nuestro modelo de datos
const EstablishmentSchema = new Schema({
    description: {
        type: String,
    },
    image_logo: validator.validateUrlSchema,
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
    photo_url: [validator.validateUrlSchema],
    uuid: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.validateHex(value, 20);
            },
            message: props => `${props.value} no es un formato hexadecimal válido, necesario 19 caractéres.`
        }
    }
});

const Establishment = mongoose.model(EstablishmentSchema);

module.exports = {
    model: Establishment
};


