'use sctrict'

const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    costumerId: {
        type: ObjectId,
        ref: 'Custumer',
        required: true
    },
    balance: {
        type: Number,
        default: 0.01,
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
        accountNumber:{
            type: Number,
            index: true
        },
        cpf:{
            type: Number,
        }
    }]
});

module.exports = mongoose.model("Account", AccountSchema);