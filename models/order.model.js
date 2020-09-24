const { reject } = require("async");
const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const { resolve } = require("path");
const cartModel = require('./cart.model')

const DB_URL = 'mongodb://localhost:27017/OnlineShop'

const orderSchema = new mongoose.Schema({
    name:String,
    totalprice:Number,
    qty:Number,
    userId:String,
    address:String,
    status:String,
    productId:String,
    timestamp:Number
})

const itemOrder = mongoose.model('order',orderSchema)

exports.addOrderById = (itemObject,address)=>{
    console.log(itemObject.name)
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true ,seNewUrlParser: true }).then(()=>{
            
            let qty = +itemObject.qty
            let price = +itemObject.price            
            let newOrder = new itemOrder({
                name:itemObject.name,
                totalprice:qty * price,
                qty:itemObject.qty,
                userId:itemObject.userId,
                address:address,
                status:'pending',
                productId:itemObject.itemId,
                timestamp:Date.now()
            })
        
            return newOrder.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
     
    })
}

exports.getOrderByUserId = (userId=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true ,setNewUrlParser: true }).then(()=>{
            return itemOrder.find({userId : userId},{},{sort:{timestamp:1}})
        }).then(orders=>{
            mongoose.disconnect()
            resolve(orders)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
})


exports.deleteFromOrder = id=>{
    console.log(typeof(id))
    console.log(id)
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL,{ useUnifiedTopology: true ,setNewUrlParser: true})
        .then(()=>{
            return itemOrder.findOneAndDelete(id)
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.delete_all = ()=>{    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return itemOrder.deleteMany()  
        }).then(()=>{            
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}