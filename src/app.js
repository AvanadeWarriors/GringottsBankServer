'use strict'

const express = require('express');
const bodyParser = require('body-parser') // Todo request será convertido em json
const mongoose = require('mongoose');
const config = require('./config')


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

//carrega os models
const AccountModel = require('./models/Account');
const CustomerModel = require('./models/Customer');

//carregar as rotas
const indexRoute = require('./routes');
const accountRoute = require('./routes/account');
const customerRoute = require('./routes/custumer');

app.use('/', indexRoute);
app.use('/account', accountRoute);
app.use('/customer', customerRoute);

module.exports = app;