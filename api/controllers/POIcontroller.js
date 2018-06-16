'use strict';

const util = require('util');
let Points = require('./../connectors/mongoConnector');

module.exports = {
    createPOI: createPOI,
    searchPOIByName: searchPOIByName,
    searchPOIByCategories: searchPOIByCategories,
    modifyPOI: modifyPOI,
    searchPOIInBox: searchPOIInBox
};



function createPOI(req, res) {

    const categories = req.body.categories.map((category) => category.toLowerCase());

    let reqToSave = new Points({
        name : req.body.name.toLowerCase(),
        lat : req.body.lat,
        lon : req.body.lon,
        categories : categories,
        address : req.body.address.toLowerCase(),
    });


    reqToSave.save().then(
        () => {res.status(200).json("Create successful ")},
        (error) => {res.status(400).json("Error in creation ", error)});
}


function searchPOIByName(req, res) {

    const name = req.swagger.params.POIName.value.toLowerCase();

    Points.collection.find({name: name}).toArray(function(error, result) {
        if (error) {
            res.status(400).json("Error in search ", error)
        }

        result.forEach((res) => {
            delete res._id;
            delete res.__v;
        });
        res.status(200).json(result)
    });
}


function searchPOIByCategories(req, res) {

    const categories = req.body.categories.map((category) => category.toLowerCase());

    Points.collection.find({ categories: { $all :  categories}}).toArray(function(error, result) {
        if (error) {
            res.status(400).json("Error in search ", error)
        }

        result.forEach((res) => {
            delete res._id;
            delete res.__v;
        });
        res.status(200).json(result)
    });

}

function modifyPOI (req, res) {

    const oldName = req.body.oldName.toLowerCase();
    const categories = req.body.categories.map((category) => category.toLowerCase());


    Points.collection.updateOne({ name: oldName, lat: req.body.oldLat, lon: req.body.oldLon }, {$set: {
        name: req.body.name.toLowerCase(),
        lat: req.body.lat,
        lon: req.body.lon,
        address: req.body.address.toLowerCase(),
        categories: categories
    }}).then(function(result, error) {
        if (error) {
            res.status(400).json("Error in search " + error)
        } else {
            res.status(200).json("Update Success")
        }

    });

}

function searchPOIInBox(req, res) {

    const lat1 = req.swagger.params.lat1.value;
    const lat2 = req.swagger.params.lat2.value;
    const lon1 = req.swagger.params.lon1.value;
    const lon2 = req.swagger.params.lon2.value;

    console.log(lat1, lat2, lon1, lon2);

    const latMax = Math.max(lat1, lat2);
    const latMin = Math.min(lat1, lat2);
    const lonMax = Math.max(lon1, lon2);
    const lonMin = Math.min(lon1, lon2);


    Points.collection.find( { lat: { $lte: latMax, $gte: latMin }, lon: {$lte: lonMax, $gte: lonMin} }).toArray(function(error, result) {
        if (error) {
            res.status(400).json("Error in search ", error)
        }

        result.forEach((res) => {
            delete res._id;
            delete res.__v;
        });
        res.status(200).json(result)
    });
}