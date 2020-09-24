const cartModel = require('../models/cart.model')
const validationResult =require('express-validator').validationResult



exports.getCart = (req,res,next)=>{       //if_get  render page,send (parametrs,flash)   if_post validationResult , flash
    cartModel.getProductByUserId(req.session.userId)
    .then(products=>{
        res.render('cart.view.ejs',{
            validationError : req.flash('validationErrors')[0],
            isUser :req.session.userId ,       //userId automatic property in session :D
            isAdmin :req.session.isAdmin,
            products:products,
            pageTittle:'Cart'
        })

    }).catch(err=>{
        reject(err)
    })
    
}

exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name:req.body.name,
            price:req.body.price,
            qty:req.body.qty,
            userId:req.session.userId,
            productId:req.body.prodcutId,
            timestamp:Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch(err=>{
            console.log(err)
        })

    }else{
        req.flash('validationErrors',validationResult(req).array()) //save errors in flash msg
        res.redirect(req.body.redirect_to)  //where we want our Error shows :D
    }
}

exports.saveCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
         cartModel.editCart(req.body.cartId,{
            qty:req.body.qty,
            timestamp:Date.now()
        }).then(()=>{
            res.redirect('/cart')            
        }).catch(err=>{
            res.redirect('/')
            console.log(err)
        })

    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}


exports.deleteInCart = (req,res,next)=>{
 cartModel
    .deleteFromCart(req.body.cartId)
    .then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    })
}

exports.delete_all = (req,res,next)=>{
    cartModel.delete_all().then(()=>{
        res.redirect('/cart')
    }).catch(err=>{
        console.log(err)
    })
}