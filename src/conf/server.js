const express = require("express"); 
//Hace falta parsear el cuerpo de la petición para que lo podamos transformar a objeto con mongoose
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); //Middleware para ver las peticiones que nos están realizando a nuestro servidor


app.listen(process.env.PORT || 3000, () => {
    console.log(`El servidor está lanzado en el puerto ${process.env.PORT || 3000}`);
})


//Configuración de los archivos estáticos que vamos a utilizar en nuestro proyecto
//(html, js, font, img....) Archivos a servir al cliente
app.use(express.static(`${__dirname}/../public`));

module.exports = app;