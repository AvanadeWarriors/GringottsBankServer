const mongoose = require('mongoose');
const TransactionModel = mongoose.model('Transaction');

exports.create = async(data) => {
    var transaction = new TransactionModel(data);
    await transaction.save();
}
