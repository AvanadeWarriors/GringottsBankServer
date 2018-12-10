'use strict';

const mongoose = require('mongoose');
const CustomerModel = mongoose.model('Customer');
const AccountModel = mongoose.model('Account');

exports.create = async(data) => {
    var customer = new CustomerModel(data);
    const customerId = await customer.save();
    return customerId._id;
}

exports.authenticate = async(data) => {

    const res = await CustomerModel.findOne({
        cpf: data.cpf,
        password: data.password
    });

    if(!res){
        return false;
    }else{
        const account = await AccountModel.findOne({
            customerId: res._id
        })
    }

    if(account.enabled){
        return res;
    }else{
        return false;
    }

}

exports.getById = async(id) => {
    const res = await CustomerModel.findById(id);
    return res;
}

