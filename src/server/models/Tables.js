//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;

//Constantes para elección de cambio de estado de una mesa
const STATE_TYPES = {
    FREE: 0,
    OCCUPIED: 1,
    ASK: 2,
    ATTENTION: 3,
    ASKING_CHECK: 4
}

const Table = new Schema({
    state: {
        type: Number,
        required: true,
        default: STATE_TYPES.FREE,
        min: STATE_TYPES.FREE,
        max: STATE_TYPES.ASKING_CHECK
    },
    uuid: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return validator.validateHex(value, 12);
            },
            message: props => `${props.value} no es un formato hexadecimal válido, necesario 19 caractéres.`
        }
    },
    identifier: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    time_state_change: {
        type: Date,
        required: false
    }
});

const Section = new Schema({
    name: {
        type: String,
        required: true
    },
    tables: [Table]
});

//Creamos el esquema de nuestro modelo de datos
const TableSchema = new Schema({
    establishmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    section: [Section]
});

//Creamos la colección y le añadimos nuestro esquema de datos
const schema = mongoose.model('Tables', TableSchema);

//Exportamos nuestra colección de Mesas y los tipos de estado
module.exports = {
    model: schema,
    STATE_TYPES
};