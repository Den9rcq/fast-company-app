const express = require('express')
const router = express.Router({ mergeParams: true })
const Quality = require('../models/Quality')

router.get('/', async (res, req) => {
    try {
        const list = await Quality.find()
        req.status(200).send(list)
    } catch (e) {
        req.status(500).json('Ошибка на сервере')
    }
})

module.exports = router