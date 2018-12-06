'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

const AccountController = require('../controllers/Account');
const TransactionController = require('../controllers/Transaction');

router.get('/:accountNumber', authService.authorize, AccountController.index);
router.post('/transaction', authService.authorize, TransactionController.store);
router.get('/statement/:filter', authService.authorize, AccountController.statement);
router.get('/statement/input/:filter', authService.authorize, AccountController.statementInput);
router.get('/statement/output/:filter', authService.authorize, AccountController.statementOutput);
router.post('/contacts', authService.authorize, AccountController.storeContacts);
router.get('/contacts', authService.authorize, AccountController.getContacts);

module.exports = router;