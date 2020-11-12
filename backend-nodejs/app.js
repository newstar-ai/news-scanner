require('dotenv/config')
const express = require('express')
const app = express()
const morgan = require('morgan')

const apiRoutes = require('./api/api_router')

app.use(morgan('dev'))

//Routes which handle requests
app.use('/api', apiRoutes)

module.exports = app; 