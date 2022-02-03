const express = require('express')
const router = express.Router({ mergeParams: true })
const Profession = require('../models/Profession')

router.get('/', async (res, req) => {
    try {
        const list = await Profession.find()
        req.status(200).send(list)
    } catch (e) {
        req.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

module.exports = router