//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../util/Tools").validator;

var ObjectId = mongoose.Schema.Types.ObjectId;

//Creamos el esquema de nuestro modelo de datos
//  {
//         "id_Establishment": "5cae1cc2066265087ae606a7",
//         "cart": [
//             {
//                 "section":{
//                     "name":"Entrantes",
//                   "" "product: [
//                         {
//                             "name":"Ensalada",
//                             "description":"La mejor ensalada",
//                             "price":10.02,
//                             "alergenos":[
//                                 "id_alergeno1", "id_alergeno2"
//                                 ]
//                         },
//                         {
//                             "name":"Ensalada2",
//                             "description":"La peor ensalada",
//                             "price":90.20,
//                             "alergenos":[
//                                 "id_alergeno1", "id_alergeno2"
//                                 ]
//                         }
//                     ]
//                 }
//             }
//         ],
//         "urlpdf":{
//             "url": {
//                 "http://www.canadacoffee.es/img/gluten.png%22%7D"
//             }
//         }
// }

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