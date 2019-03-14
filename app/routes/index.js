const express = require('express')
const { root } = require('../controllers/root')
const { notFound } = require('../controllers/notfound')

const router = express.Router()

// Routes
router.get('/', root)

// Fall Through Route
router.use(notFound)

module.exports = router