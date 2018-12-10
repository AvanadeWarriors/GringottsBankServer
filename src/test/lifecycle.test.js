const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../../ecosystem.config');


//Interceptar erros vindos da conexão com o mongoDB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('GringottsServerDB conected ...')
});



mongoose.connect(config.connectionStringTest, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
var server;
beforeAll(async ()=>{
    server = app.listen(3001);
})

const url = 'http://localhost:3001';
var token;

test('post /customer/auth', async()=>{
    return request(url)
        .post('/customer/auth')
        .send({
            "cpf":"68571368317",
            "password":"abc123"
        })
        .then(response =>{
            expect(response.status).toBe(200);
            token = response.body.token;
        }).catch(fail)
});

// test('post /customer', async ()=>{
//     return request(url)
//         .post('/customer')
//         .set('x-access-token', token)
//         .set('Content-Type', 'application/json')
//         .send({
//             "name": "Customer",
//             "lastName": "Teste",
//             "birthDate":"1900-10-29",
//             "cpf": "065.968.336-999",
//             "password": "senhateste",
//             "genre": "m",
//             "email": "teste@teste.com",
//             "addresses": [{
//                 "street":"rua teste",
//                 "number": "12",
//                 "neighborhood":"Bairro Teste",
//                 "cep": "04071080",
//                 "city":"Cidade Teste",
//                 "uf":"ET"
//             }]
//         })
//         .then(response =>{
//             expect(response.status).toBe(201);
//             expect(response.body.message).toBe('user registered');
//             expect(response.body.accountNumber).toBeDefined();
//         }).catch(fail)
// });


test('get /account/10000', async()=>{
    return request(url)
        .get('/account/10000')
        .set('x-access-token', token)
        .then(response =>{
            expect(response.status).toBe(200);
            expect(response.body.sucess).toBe(true);
            expect(response.body.accountData).toBeDefined();
        });
});
test('get /account/balance/10000', async()=>{
    return request(url)
        .get('/account/balance/10000')
        .set('x-access-token', token)
        .then(response =>{
            expect(response.status).toBe(200);
            expect(response.body.sucess).toBe(true);
            expect(response.body.accountBalance).toBeDefined();
        });
});

test('deposito post /account/transaction', async ()=>{
    return request(url)
        .post('/account/transaction')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .send({
            "accountNumber": 10000,
            "targetAccountNumber":10000,
            "amount": 200,
            "transactionType": 0
        })
        .then(response =>{
            expect(response.status).toBe(201);
            expect(response.body.sucess).toBe(true);
            expect(response.body.message).toBe('transaction sucessfull');
            expect(response.body.data).toBeDefined();
        }).catch(fail)
});


test('transferencia post /account/transaction', async ()=>{
    return request(url)
        .post('/account/transaction')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .send({
            "accountNumber": 10000,
            "targetAccountNumber":10001,
            "amount": 150,
            "transactionType": 1
        })
        .then(response =>{
            expect(response.status).toBe(201);
            expect(response.body.sucess).toBe(true);
            expect(response.body.message).toBe('transaction sucessfull');
            expect(response.body.data).toBeDefined();
        }).catch(fail)
});

test('get /account/statement/10000/10', async()=>{
    return request(url)
        .get('/account/statement/10000/10')
        .set('x-access-token', token)
        .then(response =>{
            expect(response.status).toBe(200);
            expect(response.body.sucess).toBe(true);
            expect(response.body.accountStatement).toBeDefined();
        });
});

test('get /account/statement/input/10000/10', async()=>{
    return request(url)
        .get('/account/statement/10000/10')
        .set('x-access-token', token)
        .then(response =>{
            expect(response.status).toBe(200);
            expect(response.body.sucess).toBe(true);
            expect(response.body.accountStatement).toBeDefined();
        });
});

test('get /account/statement/output/10000/10', async()=>{
    return request(url)
        .get('/account/statement/10000/10')
        .set('x-access-token', token)
        .then(response =>{
            expect(response.status).toBe(200);
            expect(response.body.sucess).toBe(true);
            expect(response.body.accountStatement).toBeDefined();
        });
});
test('post /account/contacts', async ()=>{
    return request(url)
        .post('/account/contacts')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .send({
            "accountNumber": 10000,
            "contactName":'João',
            "accountNumberContact": 10001,
            "cpfContact": '73368473310'
        })
        .then(response =>{
            expect(response.status).toBe(200);
        }).catch(fail)
});