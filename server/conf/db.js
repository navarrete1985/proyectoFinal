module.exports = {
    config: function() {
        const mongoose = require("mongoose");
        //Para evitar el warning  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
        //Este warning sale cuando asignamos que un valor de nuestro esquema tiene que ser único
        mongoose.set('useCreateIndex', true);

        //Nos conectamos a nuestra base de datos con las var de entorno creadas en nuestro .env gracias a dotenv
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error en la conexión con MongoDB'));
    }
}