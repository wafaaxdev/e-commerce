const productModel = require('../models/products.model')


exports.getHome = (req,res,next)=>{
    //1- get products form DB
    //2- render Home page HTML
    
        let category = req.query.category

        if (category && category !== 'all'){
            productModel.getProductsByCategory(category).then(products=>{
                res.render('index.view.ejs',{
                    products:products,
                    isUser:req.session.userId,  //to test
                    isAdmin:req.session.isAdmin,
                    validationError:req.flash('validationErrors')[0],
                    pageTittle:'Home'
                })
            })
        }
        else{
            productModel.getAllProducts().then(products=>{
                res.render('index.view.ejs',{
                    products:products,
                    isUser:req.session.userId ,
                    isAdmin:req.session.isAdmin,
                    validationError :req.flash('validationErrors')[0], //to test
                    pageTittle:'Home'
                })
            })      

        }

}