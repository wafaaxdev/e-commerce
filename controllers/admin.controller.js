const validationResult = require('express-validator').validationResult
const prodModel = require('../models/products.model')

exports.getAddprod = (req,res,next)=>{
    res.render('addprod.view.ejs',{
        validationErrors :req.flash('validationErrors')[0],
        isUser :true,
        isAdmin:true,
        pageTittle:'Add Products'
    })

}

exports.PostAddprod = (req,res,next)=>{
    //console.log('body is '+req.body);
    //console.log('File is  '+req.file.filename );
    if(validationResult(req).isEmpty()){
        prodModel.addProd({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:req.file.filename
        }).then(()=>{
            res.redirect('/')
        }).catch(err=>{
            res.redirect('/error') //Go to error page
        })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.render('addprod.view.ejs',{
            validationErrors :req.flash('validationErrors')[0],
            isUser :true,
            isAdmin:true
        })
    }

}