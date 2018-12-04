'use strict'

const repository = require('../repositories/customerRepository')
const transactioRepository = require('../repositories/transactionRepository')
const accountRepository = require('../repositories/accountRepository')
const userAgentService = require('../services/userAgentService');
const Validation = require('../validators/fluent-validator'); //Valida o conteudo antes de chegar no mongoose, importante futuramente

module.exports = {

    async index(req, res, next) {

    },

    // async é vida hahaha
    async store(req, res, next) {
        try {
            let accountA = await accountRepository.getByAccountNumber(req.body.accountNumber);
            let accountB = await accountRepository.getByAccountNumber(req.body.targetAccountNumber);
            if (accountA != null && accountB != null) {
                console.log(req.body.transactionType == 0)
                if (req.body.transactionType == 0) {
                    console.log('entrou');
                    let newBalance = accountA.balance += req.body.amount;

                    let transaction = {
                        type: "deposit",
                        accountId: accountA._id,
                        interactedAccountId: accountA._id,
                        postBalance: newBalance,
                        amount: req.body.amount,
                        ip: userAgentService.getIpCustomer(req),
                        userAgent: userAgentService.getUserAgent(req),
                        description: ("Deposito por envelope")
                    };
                    console.log(transaction);
                    await transactioRepository.create(transaction);

                    await accountRepository.updateBalance(accountA.accountNumber, req.body.amount, userAgentService.getUserAgent(req), userAgentService.getIpCustomer(req));
                } else if (req.body.transactionType == 1) {
                    let postBalanceA = accountA.balance += (req.body.amount * -1);
                    let postBalanceB = accountB.balance += (req.body.amount);
                    await transactioRepository.create({
                        type: "transfer",
                        accountId: accountA._id,
                        interactedAccountId: accountB._id,
                        postBalance: postBalanceA,
                        amount: (req.body.amount * -1),
                        ip: userAgentService.getIpCustomer(req),
                        userAgent: userAgentService.getUserAgent(req),
                        description: ("Transferencia Bancaria: Envio")
                    });
                    await transactioRepository.create({
                        type: "transfer",
                        accountId: accountB._id,
                        interactedAccountId: accountA._id,
                        postBalance: postBalanceB,
                        amount: (req.body.amount),
                        ip: userAgentService.getIpCustomer(req),
                        userAgentService: userAgentService.getUserAgent(req),
                        description: ("Transferencia Bancaria: Recebimento")
                    });
                    await accountRepository.updateBalance(accountA.accountNumber, (req.body.amount * -1), userAgentService.getUserAgent(req), userAgentService.getIpCustomer(req));
                    await accountRepository.updateBalance(accountB.accountNumber, (req.body.amount), userAgentService.getUserAgent(req), userAgentService.getIpCustomer(req));
                }
                return res.json({
                    sucess: true,
                    message: 'transaction sucessfull'
                });

            }

        } catch (e) {
            console.log(e);
        }
    }
}