'use strict'

const repositoryCustomer = require('../repositories/customerRepository');
const repositoryAccount = require('../repositories/accountRepository');
const Validation = require('../validators/fluent-validator'); //Valida o conteudo antes de chegar no mongoose, importante futuramente
const userAgentService = require('../services/userAgentService');
const md5 = require('md5');
const authService = require('../services/authService')

module.exports = {

    async index(req, res, next){
        
    },

    // async é vida hahaha
    async store(req, res, next){
        try {

            const customerId = await repositoryCustomer.create({
                name: req.body.name,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                cpf: req.body.cpf,
                password: md5(req.body.password + global.SALT),
                genre: req.body.genre,
                email: req.body.email,
                addresses: req.body.addresses
            });

            const accountNumber = await repositoryAccount.createAccount({
                accountNumber : await repositoryAccount.generateAccountNumber(req),
                customerId: customerId,
                lastIp: await userAgentService.getIpCustomer(req),
                lastUserAgent: await userAgentService.getUserAgent(req)         
            });
            console.log('2');
            return res.json({
                sucess: true,
                message: 'user registered'
            });

        } catch (e) {

            res.status(500).json({
                    success: false,
                    code: '',
                    message: 'request failed',
                    data: e
            });
            
        }
 
    },

    async auth(req, res, next){
        try {

            const customer = await repositoryCustomer.authenticate({
                cpf: req.body.cpf,
                password: md5(req.body.password + global.SALT)
            });

            if(!customer) {
                res.status(401).json({
                    success: 'false',
                    message: 'username and/or password invalid'
                })
            }else{
                
                const token = await authService.generateToken({
                    id: customer._id,
                    cpf: customer.cpf
                });

                res.status(201).json({
                    token: token,
                    data:{
                        cpf: customer.cpf,
                        name: customer.name,
                        isAdmin: customer.isAdmin,
                        customerId: customer._id
                    }
                });
            }

        } catch (error) {
            
        }
    },

    async update(req, res, next){

    }

}