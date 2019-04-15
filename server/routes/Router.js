const allergen = require("./Allergens");
const establishment = require("./Establishment");
const menu = require("./Menu");
const offer = require("./Offer");

function start(app) {
    app.use('/api/user', require("./User"));
    app.use('/api/login', require("./Login"));
    app.use('/api/allergen', allergen);
    app.use('/api/establishment', establishment);
    app.use('/api/menu', menu);
    app.use('/api/offer', offer);
    app.use('/api/tables', require('./Tables'));
    app.use('/api/waiter', require('./Waiter'));
}

module.exports = {
    start
}