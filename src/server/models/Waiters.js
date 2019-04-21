//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const ROLES = {
    NORMAL: 0,
    ADMIN: 1,
    SUPERADMIN: 2
}

const WaiterSchema = new Schema({
   establishment_id: {
       ObjectId
   },
   is_activate:{
        type: Boolean    
   },
   token:{
     type:String 
   },
   rol:{
        type:Number,
        required: true,
        default: ROLES.NORMAL,
        min: ROLES.NORMAL,
        max: ROLES.SUPERADMIN
   }
});



//Creamos la colección y le añadimos nuestro esquema de datos
const Waiter = mongoose.model("Waiters", WaiterSchema);

//Exportamos nuestra colección de Usuario
module.exports = {
    model: Waiter,
    ROLES
};