var mongoose = require('mongoose'),
    connection = require('../config/database');

var drinkMenuSchema = new mongoose.Schema({
    drinkName: {
        type: String,
        unique: true,
        required: true
    },
    drinkDescription: {
        type: String,
        required: true
    },
    drinkSort: { 
        type: String,
        required: true,
        enum: ["caj", "kava", "fresh", "limonada"]
    },
    price: {
        type: Number,
        required: true
    }
});
module.exports = drinkMenuSchema;