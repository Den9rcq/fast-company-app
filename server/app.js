const express = require('express')
const mongoose = require('mongoose')
const confin = require('config')
const chalk = require('chalk')

const app = express()

const PORT = confin.get('port') ?? 8080

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port: ${PORT}`))
})