const Model = require('../models/products.model')


exports.getProduct = (req,res,next)=>{
    

    let id = req.params.id
    
    if (id && id !== 'undefined'){
        Model.getProductById(id).then(products=>{
            res.render('product.view.ejs',{
                products:products,
                isUser : req.session.userId,
                isAdmin: req.session.isAdmin,
                validationError : req.flash('validationErrors')[0],
                pageTittle:'Product'
            })
        })
    }

}