const express = require('express')
const path = require('path')
const session = require('express-session')
const StoreSession = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const indexRouter = require('./routes/index.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')

//create server and client
const app = express()
const STORE = new StoreSession({
    uri :'mongodb://localhost:27017/OnlineShop',
    collection:'sessions'
})

//use static or assets
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

//to store session id
app.use(session({
    secret:'any text form your side',
    saveUninitialized:false,
    resave:true,
    store:STORE
}))
//use flash message
app.use(flash())
//set views
app.set('view engine','views')
app.set('views','views')

//use routes
app.use('/',indexRouter)
app.use('/product',productRouter)
app.use('/',authRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/admin',adminRouter)

app.use('/error',(req,res,next)=>{  //print error page
    res.render('error.view.ejs',{
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin
    })
})



app.listen(3000,(req,res)=>{
    console.log('server running ...')
})