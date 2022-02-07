const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { generateUserData } = require("../utils/helpers")
const tokenService = require('../services/token.service')
const { check, validationResult } = require('express-validator')
const chalk = require("chalk");

// 1. Get data from req (email, password ...)
// 2. Check if users already exists
// 3. Hash password
// 4. Create user
// 5. Generate tokens
router.post('/singUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина символов 8').isLength({ min: 8 }),

    async (req, res) => {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors: error.array()
                    }
                })
            }
            // 1
            const { email, password } = req.body
            // 2
            const exitingUser = await User.findOne({ email })
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
            await tokenService.save(newUser._id, tokens.refreshToken)
            res.status(201).send({ ...tokens, userId: newUser._id })

        } catch (e) {
            req.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
    }]
)

// 1. validate
// 2. find user
// 3. compare hashed password
// 4. generate token
// 5. return data
router.post('/signInWithPassword', [
    check('email', 'Email некорректный').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
    async (req, res) => {
        try {
            // 1
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        errors: error.array()
                    }
                })
            }

            const { email, password } = req.body
            // 2
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400
                    }
                })
            }

            // 3
            const isPasswordEqual = await bcryptjs.compare(password, existingUser.password)

            if (!isPasswordEqual) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                })
            }

            // 4
            const tokens = tokenService.generate({ _id: existingUser._id })
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({ ...tokens, userId: existingUser._id })
        } catch (e) {
            req.status(500).json({
                message: 'На сервере произошла ошибка'
            })
        }
    }]
)

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
    try {
        const { refreshToken } = req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const tokens = tokenService.generate({
            _id: data._id
        })

        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens, userId: data._id })
    } catch (e) {
        req.status(500).json({
            message: 'На сервере произошла ошибка'
        })
    }
})

module.exports = router