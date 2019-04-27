const express = require("express");
//Hace falta parsear el cuerpo de la petición para que lo podamos transformar a objeto con mongoose
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');

app.use(express.json());
app.use(cors());
app.use(morgan('dev')); //Middleware para ver las peticiones que nos están realizando a nuestro servidor


app.get('*js.gz', function (req, res, next) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    console.log('asdasd')
    next();
});

app.get('*css.gz', function (req, res, next) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    console.log('asdasd')
    next();
});

app.get('*html', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/html');
    console.log('asdasd')
    next();
});

//Middleware para servir index.html en caso de que se ponga una ruta no válida...esto lo necesitamos para poder convertir nuestra app Vue en SPA
let historyMiddleware = history({
    index: 'index.html',
    rewrites: [
        {
            from: /^\/api\/.*$/,
            to: function (context) {
                return context.parsedUrl.pathname;
            }
        }
    ]
})
app.use(historyMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`El servidor está lanzado en el puerto ${process.env.PORT || 3000}`);
})

//Configuración de los archivos estáticos que vamos a utilizar en nuestro proyecto
//(html, js, font, img....) Archivos a servir al cliente
app.use(express.static(`${__dirname}/../public`));


module.exports = app;