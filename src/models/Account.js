'use sctrict'

const mongoose = require('mongoose')
let Schema = mongoose.Schema.Types;

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    customerId: {
        type: Schema.ObjectId,
        ref: 'Customer',
        required: true
    },
    balance: {
        type: Number,
        default: 0.00,
        required: true
    },
    enabled: {
        type: Boolean,
        default: true,
        required: true
    },
    lastIp:{
        type: String,
        default: "0.0.0.0",
        trim: true,
        required: true
    },
    lastUserAgent:{
        type:String,
        trim: true,
        default: ""
    },
    createdTime:{
        type: Date,
        default: Date.now,
        required: true,
    },
    contacts:[{
        name: {
            type: String,
            trim: true
        },
        accountNumberContact:{
            type: Number,
            index: true,
            unique: true
        },
        cpfContact:{
            type: Number,
            unique: true
        }
    }]
});

module.exports = mongoose.model("Account", AccountSchema);