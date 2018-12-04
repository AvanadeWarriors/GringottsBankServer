'use strict'

const express = require('express');
const bodyParser = require('body-parser') // Todo request será convertido em json
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../ecosystem.config');
const logger = require('mongo-morgan-ext');


const app = express();

//Interceptar erros vindos da conexão com o mongoDB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('GringottsServerDB conected ...')
});

//Não sei exatamente para que serve os atributos com true, mas o mongoose cuspiu no terminal
mongoose.connect(config.connerctionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) // espaço = %20. Aqui podemos utilizar queryString.
app.use(bodyParser.json({ // Limite de upload de requisições
  limit: '5mb'
}));

// Enabled logs
const skipfunction = function(req, res) {
  return res.statusCode > 399;
} //Thiw would skip if HTTP request response is less than 399 i.e no errors.

app.use(logger(config.connerctionString,"logs",skipfunction)); //In your express-application

// Habilita o CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//carrega os models
const AccountModel = require('./models/Account');
const CustomerModel = require('./models/Customer');
const TransactionModel = require('./models/Transaction');

//carregar as rotas
const indexRoute = require('./routes');
const accountRoute = require('./routes/account');
const customerRoute = require('./routes/customer');

app.use('/', indexRoute);
app.use('/account', accountRoute);
app.use('/customer', customerRoute);

module.exports = app;