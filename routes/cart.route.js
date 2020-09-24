const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')
const authGard = require('./gaurds/auth.gaurd')
const check = require('express-validator').check 
const bodyP = require('body-parser').urlencoded({extended:true}) // for post method

router.get('/',authGard.isAuth,cartController.getCart)  // method (1 route,2 gaurd_if_user,4 controller)  if post  +(bodyP)  +check validation

router.post('/',authGard.isAuth,
            bodyP,
            check('qty')
            .notEmpty().withMessage('qty is required field')
            .isInt({min:1}).withMessage('qty shoud be greater than 0'),
            cartController.postCart)
router.post('/save',authGard.isAuth,
            bodyP,
            check('qty')
            .notEmpty().withMessage('qty is required field')
            .isInt({min:1}).withMessage('qty shoud be greater than 0'),            
            cartController.saveCart)
router.post('/delete',
            authGard.isAuth,
            bodyP,
            cartController.deleteInCart)

router.post('/delete_all',
            authGard.isAuth,
            bodyP,
            cartController.delete_all)





module.exports = router