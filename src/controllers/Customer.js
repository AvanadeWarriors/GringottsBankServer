'use strict'

const repositoryCustomer = require('../repositories/customerRepository');
const repositoryAccount = require('../repositories/accountRepository');
const Validation = require('../validators/fluent-validator'); //Valida o conteudo antes de chegar no mongoose, importante futuramente
const userAgentService = require('../services/userAgentService');
const md5 = require('md5');
const authService = require('../services/authService')

module.exports = {

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
                accountNumber : await repositoryAccount.generateAccountNumber(),
                customerId: customerId,
                lastIp: await userAgentService.getIpCustomer(req),
                lastUserAgent: await userAgentService.getUserAgent(req)         
            });

            return res.status(201).json({
                sucess: true,
                message: 'user registered',
                accountNumber: accountNumber.accountNumber,
                data: req.body
            });

        } catch (e) {

            res.status(400).json({
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

                const accountData = await repositoryAccount.getById(customer._id)

                const token = await authService.generateToken({
                    id: customer._id,
                    cpf: customer.cpf,
                    isAdmin: customer.isAdmin,
                    accountNumber: accountData.accountNumber
                });

                res.status(200).json({
                    token: token,
                    data:{
                        cpf: customer.cpf,
                        name: customer.name,
                        isAdmin: customer.isAdmin,
                        customerId: customer._id,
                        accountNumber: accountData.accountNumber
                    }
                });
            }

        } catch (error) {
            res.status(500).json({
                success: 'false',
                message: error
            })
        }
    },

}