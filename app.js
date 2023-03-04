const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors({ origin: ['http://localhost:4000', '*'], methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }))

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = app