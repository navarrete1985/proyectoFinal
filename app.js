require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
//Hace falta parsear el cuerpo de la petición para que lo podamos transformar a objeto con mongoose
const bodyParser = require('body-parser');
const app = express();


const Users = require("./server/routes/User");

app.listen(process.env.PORT, () => {
    console.log(`El servidor está lanzado en el puerto ${process.env.PORT}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', Users);

//Nos conectamos a nuestra base de datos con las var de entorno creadas en nuestro .env gracias a dotenv
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexión con MongoDB'));



