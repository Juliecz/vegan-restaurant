var mongoose = require('mongoose'),
    connection = require('../config/database');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true //username je povinne
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'employee']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;