var mongoose = require('mongoose'),
    connection = require('../config/database');

var drinkMenuSchema = new mongoose.Schema({
    foodName: {
        type: String,
        unique: true,
        required: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    foodType: { //vegan or raw
        type: String,
        required: true,
        enum: ["teple", "studene"]
    },
    foodSort: { //predkrm, hladni chod, napoje, dezerty atd.
        type: String,
        required: true,
        enum: ["caj", "kava", "fresh"]
    },
    price: {
        type: Number,
        required: true
    }
});
module.exports = drinkMenuSchema;