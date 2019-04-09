//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const establishment = require('./Establishment');

//Creamos el esquema de nuestro modelo de datos
  
const OfferSchema = new Schema({
    name:{
        type: String
    },
    description: {
        type: String
    },
    id_establisment:{
        type: Schema.Types.ObjectId,
        ref: 'Establishment'
    }
});

//Creamos la colección y le añadimos nuestro esquema de datos
const Offer = mongoose.model(OfferSchema);

//Exportamos nuestra colección de Usuario
module.exports = {
    model: Offer
};