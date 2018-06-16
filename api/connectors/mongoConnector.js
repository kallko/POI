"use strict";

const Mongoose = require('mongoose').Mongoose;
const mongoose = new Mongoose();
const chalk = require("chalk");

const DB_NAME = "POI";
const LOCAL_MONGODB_URI = "mongodb://localhost:27017/" + DB_NAME + "?socketTimeoutMS=120000";
const myMongo = LOCAL_MONGODB_URI;

mongoose.Promise = global.Promise;


console.log('init mongoose connection');
mongoose.connect(myMongo, {}).then(() => {
    console.log('Connected to ' + myMongo);
});
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error @ %s. Please make sure MongoDB is running.', chalk.red('✗'), myMongo);
process.exit();
});

//Schema for POI:
let Points = new mongoose.Schema(({
    name : String,
    lat: Number,
    lon: Number,
    categories: Array,
    address: String
}));

module.exports = mongoose.model('Points', Points);