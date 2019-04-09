const express = require("express"); 
//Hace falta parsear el cuerpo de la petición para que lo podamos transformar a objeto con mongoose
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
    console.log(`El servidor está lanzado en el puerto ${process.env.PORT}`);
})

module.exports = app;