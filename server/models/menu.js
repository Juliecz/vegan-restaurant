var mongoose = require('mongoose'),
    connection = require('../config/database');

var menuSchema = new mongoose.Schema({
    foodName: {
        type: String,
        unique: true,
        required: true
    },
    foodDescription: {
        type: String,
        required: false
    },
    foodType: { //vegan or raw
        type: String,
        required: true,
        enum: ["vegan", "raw"]
    },
    foodSort: { //predkrm, hladni chod, napoje, dezerty atd.
        type: String,
        required: true,
        enum: ["predkrm", "hlavni", "salat", "dezert"]
    },
    price: {
        type: Number,
        required: true
    }
});
module.exports = menuSchema;
