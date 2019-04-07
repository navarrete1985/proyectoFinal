//Configuración para poder usar las variables de entorno .env
require("dotenv").config();
//Configuración de nuestra conexión a la base de datos
require("./server/conf/db").config();
//Configuración de nuestro servidor
const app = require("./server/conf/server");

//Inicialización de nuestras rutas de escucha
require("./server/routes/Router").start(app);


