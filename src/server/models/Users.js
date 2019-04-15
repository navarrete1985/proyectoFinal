//Requerimos le módulo de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regExEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

//Creamos el esquema de nuestro modelo de datos
const UserSchema = new Schema({
    address: {
        type: String
    },
    connect: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return regExEmail.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'Email required'],
        unique: true
    },
    establishment_id: {
        type: String
    },
    favorites: {
        type: Array
    },
    gender: {
        type: Boolean
    },
    lastName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    phone_numher: {
        type: Number
    },
    photo_url: {
        type: String
    },
    table_id: {
        type: Array
    }
});

//Creamos la colección y le añadimos nuestro esquema de datos
const User = mongoose.model('Users', UserSchema);

//Exportamos nuestra colección de Usuario
module.exports = {
    model: User
};


