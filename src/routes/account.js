'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

const AccountController = require('../controllers/Account');
const TransactionController = require('../controllers/Transaction');

router.get('/:id', authService.authorize, AccountController.index);
router.post('/', authService.authorize, AccountController.store);
router.post('/transaction/', authService.authorize, TransactionController.store);


module.exports = router;