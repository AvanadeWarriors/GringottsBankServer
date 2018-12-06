'use strict'

const repositoryCustomer = require('../repositories/customerRepository');
const repositoryAccount = require('../repositories/accountRepository');
//Valida o conteudo antes de chegar no mongoose, importante futuramente
const Validation = require('../validators/fluent-validator'); 

module.exports = {

    // Dados sobre o cliente e sua conta
    async index(req, res, next){
        let account = await repositoryAccount.getByAccountNumber(req.params.accountNumber);

        if(!account){
            res.status(404).json({
                success: false,
                code: '',
                message: 'request failed',
             });
        }else{
            let customer = await repositoryCustomer.getById(account.customerId);

            return res.status(200).json({
                sucess: true,
                accountData: {
                    accountNumber: account.accountNumber,
                    name: customer.name,
                    cpf: customer.cpf
                }
            });

        }
        
    },

    // Perm
    async store(req, res, next){
        try {

            let account = new AccountModel(req.body);
            await account.save();
            return res.status(201).json({
                sucess: true,
                message: 'created account'
            });

        } catch (error) {

            res.status(500).json({
                    success: false,
                    code: '',
                    message: 'request failed',
                    data: error
            });
            
        }
    },

    async statement(req, res, next){

        try {

            let accountStatement = await repositoryAccount.getStatement(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatement.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatement
                });
            }else{
                return res.status(404).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }
            

        } catch (error) {

            res.status(500).json(error)

        }
        
    },

    async statementInput(req, res, next){

        try {
            let accountStatementInput = await repositoryAccount.getStatementInput(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatementInput.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatementInput
                });
            }else{
                return res.status(404).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }

        } catch (error) {

            res.status(500).json(error);

        }

    },

    async statementOutput(req, res, next){

        try {
            
            let accountStatementOutput = await repositoryAccount.getStatementOutput(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatementOutput.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatementOutput
                });
            }else {
                return res.status(404).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }

        } catch (error) {

            res.status(500).json(error);

        }

    },

    async storeContacts(req, res, next){

        try {
            
            let account = await repositoryAccount.accountStoreContacts(req.body);

            if(!account){
                res.status(404).json({
                    success: false,
                    code: '',
                    message: 'request failed',
                });
            }else{
                return res.status(200).json({
                    sucess: true,
                    account
                });
            }

        } catch (error) {

            res.status(500).json({
                success: false,
                code: '',
                message: 'request failed',
                data: error
            });

        }

    },

    async getContacts(req, res, next){

        try {
            
            let accountData = await repositoryAccount.getAccountContacts(req.params.accountNumber);

            if(!accountData){
                res.status(404).json({
                    success: false,
                    code: '',
                    message: 'request failed',
                    data: error
                });
            }else{
                return res.status(200).json({
                    sucess: true,
                    accoutContactsData: accountData.contacts
                });
            }

        } catch (error) {

            res.status(500).json({
                success: false,
                code: '',
                message: 'request failed',
                data: error
            });

        }
    },

}