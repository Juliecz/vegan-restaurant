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
        required: false
    },
    phoneEmail: {
        type: Boolean,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    phoneMessage: {
        type: Boolean,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;