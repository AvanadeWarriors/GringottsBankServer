'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

const AccountController = require('../controllers/Account');

router.get('/:id', authService.authorize, AccountController.index);
router.post('/', authService.authorize, AccountController.store);


module.exports = router;