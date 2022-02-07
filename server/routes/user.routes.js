const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')

router.get('/', async (res, req) => {
    try {
        const list = await User.find()
        req.send(list)
    } catch (e) {
        req.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})
router.patch('/:id', async (res, req) => {
    try {
        const { id } = req.params
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true})
        req.send(updatedUser)
    } catch (e) {
        req.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

module.exports = router