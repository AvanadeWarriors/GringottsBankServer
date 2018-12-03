'use sctrict'

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: ['m','f'],
        required: true
    },
    email: {
        type: String, 
        lowercase: true
    },
    createdTime:{
        type: Date,
        default: Date.now,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addresses: [{
        street: {
            type: String
        },
        number: {
            type: Number
        },
        neighborhood: {
            type: String
        },
        city: {
            type: String
        },
        uf: {
            type: String
        } 
    }]
});

module.exports = mongoose.model("Customer", CustomerSchema);