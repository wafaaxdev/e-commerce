const { reject } = require('async')
const mongoose = require('mongoose')
const { resolve } = require('path')


DB_URL = 'mongodb://localhost:27017/OnlineShop'

//Databse Schema
const productSchema = mongoose.Schema({
    name : String,
    image : String,
    price : Number,
    description : String,
    category : String

})
//database model
const Product = mongoose.model('product',productSchema)

exports.getAllProducts = ()=>{
    //connect DB
    //get all products 
    // disconnect DB
    //vip : to let Controller watch results coming from here we must create promise :D 

    
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{  // because connection doese not get any this so then is empty  :)
            return Product.find({})     
        }).then(products=>{                 //because find get all product so then has array of objects i can called him anything :D
            mongoose.disconnect()
            resolve(products)
        }).catch(err=> {
            reject(err)
        })
    })


}

exports.getProductsByCategory = (category)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category:category})
        }).then((category)=>{
            mongoose.disconnect()
            resolve(category)
        }).catch((err)=>{
            reject(err)
        })
    })
}

exports.getProductById = (id)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findById(id)
        }).then((products)=>{
            mongoose.disconnect()
            resolve(products)
        }).catch((err)=>{
            reject(err)
        })
    })

}

exports.addProd = (Data)=>{
    return new Promise((resolve,reject)=>{
    return reject('error')
        mongoose.connect(DB_URL).then(()=>{
            
            let prod = new Product({
                name:Data.name,
                description:Data.description,
                price:Data.price,
                category:Data.category,
                image:Data.image
            })
            return prod.save()
            
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            reject(err)
        })
    })
}