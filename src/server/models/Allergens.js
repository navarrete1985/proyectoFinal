//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;
var ObjectId = mongoose.Schema.Types.ObjectId;

// {
//     "name":"Gluten1",
//     "image": {
//         "url": "http://www.canadacoffee.es/img/gluten.png%22%7D"
//     }
// }

//Creamos el esquema de nuestro modelo de datos
const AllergenSchema = new Schema({
    name:{
        type: String
    },
    image: validator.validateUrlSchema
});

//Creamos la colección y le añadimos nuestro esquema de datos
const Allergen = mongoose.model("Allergen", AllergenSchema);

//Exportamos nuestra colección de Usuario
module.exports = {
    model: Allergen
};