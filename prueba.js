let mongoose = require('mongoose');
require("dotenv").config();
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://near:1234_Mongo@cluster0-zawh9.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error')
            console.log(err);
        })
    }
}
module.exports = new Database();