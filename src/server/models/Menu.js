//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;

var ObjectId = mongoose.Schema.Types.ObjectId;

const product = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }
    ,
    price:{
        type:Schema.Types.Decimal128
    },
    alergenos:[{
        type: Schema.Types.ObjectId,
        ref: 'Allergens'
    }]
       
});

const ObjectCart = new Schema({
   section:{
       name:{
           type:String
       },
       product:[product]
   }
});

const MenuSchema = new Schema({
    id_Establishment: {
        type: Schema.Types.ObjectId, 
        ref: 'Establishment', 
        required: true
    },
    cart:[ObjectCart],
    urlpdf:validator.validateUrlSchema,
});

//Creamos la colección y le añadimos nuestro esquema de datos
const Menu = mongoose.model("Menu", MenuSchema);

//Exportamos nuestra colección de Usuario
module.exports = {
    model: Menu
};