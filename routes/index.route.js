const express = require('express')
const router = express.Router()
const homeController = require('../controllers/index.controller')
const authGaurd = require('./gaurds/auth.gaurd')

router.get('/', homeController.getHome) //middleware in controller folder



module.exports = router
