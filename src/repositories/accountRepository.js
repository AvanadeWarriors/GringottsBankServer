const mongoose= require('mongoose');
const AccountModel = mongoose.model('Account');

exports.createAccount = async (data) => {
    var account = new AccountModel(data);
    const accountNumber = await account.save();
    return accountNumber;
}

exports.getById = async (id) => {
    const res = await AccountModel.findOne({"customerId":id},{ "_id": 0, "balance": 1, "accountNumber": 1, "contacts": 1});
    return res;
}

exports.getByAccountNumber = async (number) => {
    const res = await AccountModel.findOne({"accountNumber": number});
    return res;
}

exports.generateAccountNumber = async () => {
    const lastAccountNumber = await AccountModel.findOne({},{}, {sort: {'accountNumber': -1}});
    const nenewAccountNumber = undefined;
    if(lastAccountNumber == null){
        newAccountNumber = 10000;
    }else{
        newAccountNumber = lastAccountNumber.accountNumber + 1;
    }  
    return newAccountNumber;
}

exports.updateBalance = async(number, amount, agent, ip) => {
    let res = await AccountModel.findOne({accountNumber: number});
    res.balance += amount;

    res = await AccountModel.updateOne(
        { accountNumber: number }, 
        { $set: 
            {
                balance: res.balance, 
                lastIp: ip, 
                lastUserAgent: agent
            }
        }
    );
    
    return res;
}