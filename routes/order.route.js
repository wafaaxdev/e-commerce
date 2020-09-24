const express = require('express')
const router = express.Router()
const authGard = require('./gaurds/auth.gaurd')
const check = require('express-validator').check 
const bodyP = require('body-parser').urlencoded({extended:true}) // for post method
const orderController = require('../controllers/order.controller')

/*
router.get('/',
            authGard.isAuth,            
            check('address').notEmpty().withMessage('Shipping address is required'),
            orderController.)
*/
router.get('/',authGard.isAuth,orderController.getOrder)

router.post('/',authGard.isAuth,bodyP,
                /*check('address').notEmpty().withMessage('Address is required'),*/ //validate field
                orderController.addOrder)
router.post('/v_order',
            authGard.isAuth,
            bodyP,
            orderController.v_order)

router.post('/v_order_all',
            authGard.isAuth,
            bodyP,
            orderController.v_order_all)

router.post('/delete',authGard.isAuth,
            bodyP,
            orderController.deleteOrder)

router.post('/delete_all',authGard.isAuth,
            bodyP,
            orderController.delete_all)


module.exports = router