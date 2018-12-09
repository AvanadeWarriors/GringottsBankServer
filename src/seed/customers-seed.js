'use strict';

const mongoose = require('mongoose');
const md5 = require('md5');
const config = require('../../ecosystem.config');

let Schema = mongoose.Schema.Types;

let conn = config.connectionString;

process.argv.forEach(function (val, index, array) {
    if(val == '-test'){
        conn = config.connectionStringTest;
        console.log("seeding test db")
    }
});

mongoose.connect(conn, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

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
        cep: {
            type: Number
        },
        city: {
            type: String
        },
        uf: {
            type: String
        } 
    }]
});

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
            index: true
        },
        cpfContact:{
            type: Number,
        }
    }]
});

let Account = mongoose.model("Account", AccountSchema);

let Customer = mongoose.model("Customer", CustomerSchema);


var customers = [{
        name: 'Paulo Melo',
        lastName: 'da Silva',
        birthDate: '1984-09-01',
        cpf: '68571368317',
        password: '5fa5e73e18dfb090a8c765d28f1b9c7d',
        genre: 'm',
        email: 'paulo@gringottsbanks.ddns.net',
        isAdmin: true,
        addresses: [{
            street: 'Rua azul',
            number: '23',
            neighborhood: 'Jardim Céu',
            cep: '11713070',
            city: 'Praia Grande',
            uf: 'SP'
        }]
    },
    {
        name: 'Livia Néri',
        lastName: 'dos Santos',
        birthDate: '1972-07-15',
        cpf: '73368473310',
        password: '5fa5e73e18dfb090a8c765d28f1b9c7d',
        genre: 'f',
        email: 'livia@gringotsbanks',
        isAdmin: false,
        addresses: [{
            street: 'Rua Amarelo',
            number: '24',
            neighborhood: 'Jardim Limeira',
            cep: '11820010',
            city: 'São Vicente',
            uf: 'SP'
        }]
    },
    {
        name: 'Matheus Alfeu',
        lastName: 'Pereira',
        birthDate: '1996-06-12',
        cpf: '55071304856',
        password: '5fa5e73e18dfb090a8c765d28f1b9c7d',
        genre: 'm',
        email: 'harada@gringottsbanks.ddns.net',
        isAdmin: false,
        addresses: [{
            street: 'Rua Verde',
            number: '25',
            neighborhood: 'Jardim das Acacias',
            cep: '23245043',
            city: 'Jahu',
            uf: 'SP'
        }]
    },
    {
        name: 'José Eduardo',
        lastName: 'de Oliveira Lima',
        birthDate: '1996-01-29',
        cpf: '50556484304',
        password: '5fa5e73e18dfb090a8c765d28f1b9c7d',
        genre: 'm',
        email: 'jose@gringottsbanks.ddns.net',
        isAdmin: true,
        addresses: [{
            street: 'Rua Viloleta',
            number: '26',
            neighborhood: 'Vila Nova',
            cep: '26456023',
            city: 'Jardim Kalah',
            uf: 'RJ'
        }]
    },
    {
        name: 'Sinara Molib',
        lastName: 'Castro',
        birthDate: '1990-01-17',
        cpf: '08137242015',
        password: '5fa5e73e18dfb090a8c765d28f1b9c7d',
        genre: 'f',
        email: 'sinara@gringottsbanks.ddns.net',
        isAdmin: false,
        addresses: [{
            street: 'Rua Neri',
            number: '45',
            neighborhood: 'Vila Esperança',
            cep: '65664342',
            city: 'Piracicaba',
            uf: 'SP'
        }]
    },

];

let generateCustomer = async (data) => {
    var customer = new Customer(data);
    let customerId = await customer.save();

    return customerId._id;
}

let generateAccountNumber = async () => {
    let lastAccountNumber = await Account.findOne({},{}, {sort: {'accountNumber': -1}});

    let newAccountNumber = null;

    if(lastAccountNumber == null){
        newAccountNumber = 10000;
    }else{
        newAccountNumber = lastAccountNumber.accountNumber + 1;
    }  
    return newAccountNumber;
}

let generateAccount = async (data) =>{
    var account = new Account({
        accountNumber : await generateAccountNumber(),
        customerId: data  
    });

    let accountNumber = await account.save();

    return accountNumber;

}

let exit = () =>{
    console.log(' ')
    console.log('Concluido')
    mongoose.disconnect();
}

var done = 0;
async function  processArray(array) {
    for (var i = 0; i < array.length; i++) {
        let customerID = await generateCustomer(array[i]);
        let generateAccountData = await generateAccount(customerID);

        console.log('Conta: ' + array[i].name, ' - ' + generateAccountData.accountNumber + `  {cpf: ${array[i].cpf}, password: abc123} - ok`)

        done++
        if(done == customers.length){
            exit();
        }
    }
}

processArray(customers);
