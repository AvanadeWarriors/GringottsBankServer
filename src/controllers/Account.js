'use strict'

const repository = require('../repositories/accountRepository');
//Valida o conteudo antes de chegar no mongoose, importante futuramente
const Validation = require('../validators/fluent-validator'); 



module.exports = {

    //O ideal deste item é levar alguns dados importandes do cliente e o saldo.
    async index(req, res, next){
        let account = await repository.getById(req.params.id);
        return res.json(account);
    },

    // async é vida hahaha
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

}