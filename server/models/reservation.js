var mongoose = require('mongoose'),
    connection = require('../config/database'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
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
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = reservationSchema;