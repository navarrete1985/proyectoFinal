//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Constantes para elección de cambio de estado de una mesa
const STATE_TYPES = {
    FREE: 0,
    OCCUPIED: 1,
    ASK: 2,
    ATTENTION: 3,
    ASKING_CHECK: 4
}

//Creamos el esquema de nuestro modelo de datos
const TableSchema = new Schema({
    establishmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    state: {
        type: Number,
        required: true,
        default: STATE_TYPES.FREE,
        min: STATE_TYPES.FREE,
        max: STATE_TYPES.ASKING_CHECK
    }
});

//Creamos la colección y le añadimos nuestro esquema de datos
const Table = mongoose.model('Tables', TableSchema);

//Exportamos nuestra colección de Mesas y los tipos de estado
module.exports = {
    model: Table,
    STATE_TYPES
};