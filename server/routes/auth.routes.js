const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { generateUserData } = require("../utils/helpers")
const tokenService = require('../services/token.service')

// 1. Get data from req (email, password ...)
// 2. Check if users already exists
// 3. Hash password
// 4. Create user
// 5. Generate tokens
router.post('/singUp', async (req, res) => {
    try {
        // 1
        const { email, password } = req.body
        // 2
        const exitingUser = User.findOne({ email })
        if (exitingUser) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }

        // 3
        const hashedPassword = await bcryptjs.hash(password, 12)

        // 4
        const newUser = await User.create({
            ...generateUserData(),
            ...req.body,
            password: hashedPassword
        })

        // 5
        const tokens = tokenService.generate({ _id: newUser._id })
        res.status(201).send({...tokens, userId: newUser._id})

    } catch (e) {
        req.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

router.post('/signInWithPassword', async (req, res) => {

})

router.post('/token', async (req, res) => {

})

module.exports = router