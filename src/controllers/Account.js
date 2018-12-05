'use strict'

const repository = require('../repositories/accountRepository');
//Valida o conteudo antes de chegar no mongoose, importante futuramente
const Validation = require('../validators/fluent-validator'); 



module.exports = {

    // Dados sobre o cliente e sua conta
    async index(req, res, next){
        let account = await repository.getById(req.params.id);
        return res.json(account);
    },

    // Perm
    async store(req, res, next){
        try {

            let account = new AccountModel(req.body);
            await account.save();
            return res.json({
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

            let accountStatement = await repository.getStatement(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatement.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatement
                });
            }else{
                return res.status(200).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }
            

        } catch (error) {

            res.json(error)

        }
        
    },

    async statementInput(req, res, next){

        try {
            let accountStatementInput = await repository.getStatementInput(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatementInput.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatementInput
                });
            }else{
                return res.status(200).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }

        } catch (error) {

            res.json(error);

        }

    },

    async statementOutput(req, res, next){

        try {
            
            let accountStatementOutput = await repository.getStatementOutput(req.body.accoutNumber, parseInt(req.params.filter));
            if(accountStatementOutput.length !== 0){
                return res.status(200).json({
                    sucess: true,
                    accountStatementOutput
                });
            }else{
                return res.status(200).json({
                    sucess: false,
                    message: 'you do not have any releases'
                }); 
            }

        } catch (error) {

            res.json(error);

        }

    },

    async statementFuture(req, res, next){
        try{
            res.status(200).json({
                sucess: 'false',
                message: "you do not have any releases"
            })
        }catch (error) {
            res.json(error);
        }

    }

}