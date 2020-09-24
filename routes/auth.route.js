const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const bodyP = bodyParser.urlencoded({extended:true})
const check = require('express-validator').check
const authGaurd = require('./gaurds/auth.gaurd')



router.get('/signup',authGaurd.notAuth, authController.getSignup)//incontroller
router.post('/signup',
            authGaurd.notAuth,
            bodyP,
            check('username').notEmpty().withMessage('username is required'),
            check('email').notEmpty().isEmail().withMessage('invalid mail formate') ,
            check('password').notEmpty().isLength({min:8}).withMessage('number of charecter is 8') ,
            check('confirmpassword').custom((value,{req})=>{
                if(value === req.body.password) return true
                else throw 'Your password not matched'
            }),
            authController.postSignup )

router.get('/login',authGaurd.notAuth,authController.getLogin)
router.post('/login',
            authGaurd.notAuth,
            bodyP,
            check('username').notEmpty().withMessage('username is required') ,
            check('password').notEmpty().withMessage('password is required') ,
            authController.postLogin)

router.post('/logout',authGaurd.isAuth,authController.logout)






module.exports = router