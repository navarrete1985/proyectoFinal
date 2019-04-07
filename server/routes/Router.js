function start(app) {
    app.use('/api/user', require("./User"));
    //app.use('/api/tables', require('./Tables'));
}

module.exports = {
    start
}