const { reject } = require('async')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { stringify } = require('querystring')


const DB_URL = 'mongodb://localhost:27017/OnlineShop'

const cartSchema = mongoose.Schema({
    name:String,
    price:Number,
    qty:Number,
    userId:String,
    productId:String,
    timestamp:Number
})

const CartItem = mongoose.model('cart',cartSchema)


exports.addNewItem = (data)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return CartItem.findOne({productId:data.productId}).then(prod=>{
                if(prod){
                    let oldQty = +prod.qty
                    let newQty = +data.qty
                    let sumQty = oldQty + newQty
                    return CartItem.updateOne({_id:prod._id},{qty:sumQty,timestamp:data.timestamp})                

                }else{
                    let item = new CartItem(data)
                    return item.save()
                }
            })
            
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getProductByUserId = (userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
           return CartItem.find({userId : userId},{},{sort:{timestamp:1}})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editCart = (id,newData)=>{
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true })
        .then(()=>{
            return CartItem.updateOne({_id:id},newData)
        })
        .then((items)=>{
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err=>{
            mongoose.disconnect()
            reject(err)
        });
    
    });
};

exports.deleteFromCart = id=>{
    return new Promise((resolve,reject)=>{
        mongoose
        .connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true })
        .then(()=>{
           return CartItem.findByIdAndDelete(id)
        })
        .then(()=>{
            mongoose.disconnect()
            console.log('delete done')
            resolve()
        })
        .catch(err=>{
            mongoose.disconnect()
            console.log(err)
            reject(err)

        });
    });
};

exports.delete_all = ()=>{    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true,useNewUrlParser: true }).then(()=>{
            return CartItem.deleteMany()  
        }).then(()=>{            
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}