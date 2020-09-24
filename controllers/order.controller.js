const validationResult = require('express-validator').validationResult
const orderModel = require('../models/order.model')
const cartModel = require('../models/cart.model')



/*
exports.order = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        orderModel.addItemOrder
    }
}
*/


exports.v_order = (req,res,next)=>{
    console.log(req.body.cartId)
    let curr_document ={
        _id:req.body.cartId,
        name:req.body.name,
        qty:req.body.qty,
        price:req.body.price
    }
    res.render('v_order.view.ejs',{
        isUser :req.session.userId,
        isAdmin:req.session.isAdmin,
        pageTittle:'Verify Order',
        DocId:curr_document
    })
    cartModel.deleteFromCart(curr_document._id).then(()=>{
        res.redirect('/v_order')
    }).catch(err=>{
        console.log(err)
    })
}


exports.v_order_all = (req,res,next)=>{
    cartModel.getProductByUserId(req.session.userId).then(items=>{
        console.log(typeof(items))
        console.log(items)
        res.render('v_order.view.ejs',{
            isUser :req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTittle:'Verify Order',
            DocIds:items})
    }).catch(err=>{
        console.log('my list err '+ err)
    })
}

exports.getOrder =(req,res,next)=>{   
    orderModel.getOrderByUserId(req.session.userId).then(orders=>{
            res.render('order.view.ejs',{
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTittle:'Orders',
            orders:orders
        })
        
    }).catch(err=>{
        console.log(err)
    })     
   

}

exports.addOrder = (req,res,next)=>{
    let curr_document ={
        itemId:req.body.item,
        name:req.body.name,
        qty:req.body.qty,
        price:req.body.price,
        userId:req.session.userId
    }
       orderModel.addOrderById(curr_document,req.body.address).then(()=>{
        res.redirect('/order')

    }).catch(err=>{
        console.log(err)
    })
}

exports.deleteOrder = (req,res,next)=>{
    orderModel.deleteFromOrder(req.body.orderId).then(()=>{
        res.redirect('/order')
    }).catch(err=>{
        console.log(err)
    })
}

exports.delete_all = (req,res,next)=>{
    orderModel.delete_all().then(()=>{
        res.redirect('/order')
    }).catch(err=>{
        console.log(err)
    })
}