const userModel = require('../models/users.model')
const session = require('express-session')
const validationResult = require('express-validator').validationResult

exports.getSignup = (req,res,next)=>{
    res.render('signup.view.ejs',{
        validationErrors : req.flash('validationErrors'),
        isUser:req.session.userId,
        isAdmin:false,
        pageTittle:'SignUp'

    });
}
exports.postSignup = (req,res,next)=>{
    if (validationResult(req).isEmpty()){
            
        //get data from Form and send to DB
        userModel.createNewUser(req.body.username,req.body.email,req.body.password).then(()=>{       
            res.redirect('/login')
        }).catch((err)=>{
            res.redirect('/signup')
        })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/signup')
    }
}



exports.getLogin = (req,res,next)=>{
    
    res.render('login.view.ejs',{
        loginError :req.flash('loginError')[0],
        validationErrors :req.flash('validationErrors'),
        isUser :req.session.userId,
        isAdmin:false
    })
}
exports.postLogin = (req,res,next)=>{
        if(validationResult(req).isEmpty()){
        userModel.loginUser(req.body.username,req.body.password).then((result)=>{
            req.session.userId = result.id
            req.session.isAdmin = result.isAdmin                
            res.redirect('/')
            
        }).catch((err)=>{
            req.flash('loginError',err)
            res.redirect('/login')
        })
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/login')
    }
}


exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    });
    
};