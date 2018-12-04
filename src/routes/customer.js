'use strict'

const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

const CustomerController = require('../controllers/Customer');

router.post('/', CustomerController.store);
router.post('/auth', CustomerController.auth);

module.exports = router;