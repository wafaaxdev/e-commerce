const express = require('express')
const { route } = require('./cart.route')
const router = express.Router()
const adminGaurd = require('./gaurds/admin.gaurd')
const adminController = require('../controllers/admin.controller')
//const bodyP = require('body-parser').urlencoded({extended:true})
const check = require('express-validator').check
const multer = require('multer')

router.get('/add',adminGaurd.isAdmin,adminController.getAddprod)
router.post('/add',adminGaurd.isAdmin,
            multer({
                storage:multer.diskStorage({
                    destination:(req,file,cb)=>{
                        cb(null,'images');
                    },
                    filename:(req,file,cb)=>{
                        cb(null,Date.now() + "-" + file.originalname);
                    }
                })
            }).single('image'),            //multer must come first in validation then all check() :D 
            check('name').notEmpty().withMessage('name is required'),
            check('description')
                .notEmpty().withMessage('description is required'),
            check('price')
                .notEmpty().withMessage('price is required'),
            check('category').notEmpty().withMessage('category is required')
            ,
            check('image').custom((value,{req})=>{
                if (req.file) return true
                else throw 'image is required'
            }),
            adminController.PostAddprod);



module.exports = router