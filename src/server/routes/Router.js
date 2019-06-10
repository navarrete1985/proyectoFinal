function start(app) {
    
    app.use('/', require("./login"));
    app.use('/api/user', require("./user"));
    app.use('/api/allergen', require("./allergens"));
    app.use('/api/establishment', require("./establishment"));
    app.use('/api/menu', require("./menu"));

    app.use('/api/offer', require("./offer"));
    app.use('/api/tables', require('./tables'));
    app.use('/api/waiter', require('./waiter'));
    app.use('/', require('./upload'));
}

module.exports = {
    start
}