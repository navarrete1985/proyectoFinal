const allergen = require("./Allergens");

function start(app) {
    app.use('/api/user', require("./User"));
    app.use('/api/allergen', allergen);
    //app.use('/api/tables', require('./Tables'));
}

module.exports = {
    start
}