//const { reject } = require('async')
//const { reject } = require('async')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const { resolve } = require('path')
const { reject } = require('async')
//const { resolve } = require('path')
//const { disconnect } = require('process')

const DB_URL = 'mongodb://localhost:27017/OnlineShop'



const userSchema = mongoose.Schema({
    username:String,
    email : String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('user',userSchema)


exports.createNewUser = (username,email,password)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology:true},()=>{}).then(()=>{
            return User.findOne({email :email})
         }).then((user)=>{
             
             if (user){
                 mongoose.disconnect()
                 reject('User is found')   
             } 
             else{
                 return bcrypt.hash(password,10)
                }
         }).then((hashedPass)=>{            
            let user = new User({
                username : username,
                email : email,
                password :hashedPass
            })
            
            return user.save()            
            

         }).then(()=>{
             resolve()
         }).catch((err)=>{
             console.log('db is not working')
             mongoose.disconnect()
             reject(err)
         })
    })

}

exports.loginUser = (username,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL,{ useUnifiedTopology: true ,useNewUrlParser: true},()=>{})
        .then(()=>{
            return User.findOne({username:username})
        }).then(user=>{
            console.log(user)  // to delete
            if(!user){
                mongoose.disconnect()
                reject('This user is incorrect')
            }
            else{
                bcrypt.compare(password,user.password).then(same=>{
                if(!same){
                    mongoose.disconnect()
                    reject('passwrod is incorrect')                    
                    
                }
                else{
                    mongoose.disconnect()                   
                    resolve({
                        id:user._id,
                        isAdmin:user.isAdmin
                    })
                }
            })
            }
        }).catch(err=>{
            reject(err)
        })
    })
}
    