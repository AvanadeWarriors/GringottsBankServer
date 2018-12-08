'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

const AccountController = require('../controllers/Account');
const TransactionController = require('../controllers/Transaction');

router.get('/:accountNumber', authService.authorize, AccountController.index);
router.get('/balance/:accountNumber', authService.authorize, AccountController.balance);
router.post('/transaction', authService.authorize, TransactionController.store);
router.get('/statement/:accountNumber/:filter', authService.authorizeAccount, AccountController.statement);
router.get('/statement/input/:accountNumber/:filter', authService.authorizeAccount, AccountController.statementInput);
router.get('/statement/output/:accountNumber/:filter', authService.authorizeAccount, AccountController.statementOutput);
router.post('/contacts', authService.authorizeAccount, AccountController.storeContacts);
router.get('/contacts/:accountNumber', authService.authorizeAccount, AccountController.getContacts);

module.exports = router;