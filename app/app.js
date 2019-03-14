const express = require('express')
const routes = require('./routes')

// Create Express App
const app = express()

// Routes
app.use('/', routes)

module.exports = app
