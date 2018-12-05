'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "GringottsBank API",
        version: "1.0.0"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).send({
        title: "GringottsBank API",
        version: "1.0.0"
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).send({
        title: "GringottsBank API",
        version: "1.0.0"
    });
});

router.put('/', (req, res, next) => {
    res.status(200).send({
        title: "GringottsBank API",
        version: "1.0.0"
    });
});

module.exports = router;