var mongoose = require('mongoose'),
    connection = require('../config/database');
var reservationSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    table: {
        type: ObjectId,
        required: true
    },
    nameReserve: {
        type: String,
        required: true
    },
    emailReserve: {
        type: String,
        required: true
    },
    phoneReserve: {
        type: Number,
        required: true
    }
});

module.exports = reservationSchema;