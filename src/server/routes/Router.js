function start(app) {
    
    app.use('/', require("./Login"));
    app.use('/api/user', require("./User"));
    app.use('/api/allergen', require("./Allergens"));
    app.use('/api/establishment', require("./Establishment"));
    app.use('/api/menu', require("./Menu"));
    app.use('/api/offer', require("./Offer"));
    app.use('/api/tables', require('./Tables'));
    app.use('/api/waiter', require('./Waiter'));
    app.use('/', require('./Upload'));
}

module.exports = {
    start
}