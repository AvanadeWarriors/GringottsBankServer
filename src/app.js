'use strict'

const express = require('express');
const bodyParser = require('body-parser') // Todo request será convertido em json
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) // espaço = %20. Aqui podemos utilizar queryString.
app.use(bodyParser.json({ // Limite de upload de requisições
  limit: '5mb'
}));



// Habilita o CORS
app.use(cors({origin: 'https://gringottsbanks.ddns.net'}));
app.use(function (req, res, next) {
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