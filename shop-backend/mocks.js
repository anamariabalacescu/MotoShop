const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config()
var User=require('./schemas/userSchema')
var ObjectId = require('mongodb').ObjectID;
const { USER_TYPES, switchUserSecret } = require('./utils/enums')
var Review = require('./schemas/reviewSchema');
var multer=require('multer');
var Product = require('./schemas/productSchema');

var MotorType=require('./schemas/motorTypeSchema')
var Order = require('./schemas/orderSchema');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


  function createAdminUser(){
    User.findOne({
        email: 'admin@gmail.com',
    }).then(user => {
        if (!user) {
            bcrypt.hash('admin', 10, function(err, hash) {
                if (err) {
                    console.log(err)
                }
                const user = new User({
                    email: 'admin@gmail.com',
                    password: hash,
                    type: USER_TYPES.ADMIN
                })
                user.save().then(user => {
                    console.log('Admin user created')
                }).catch(err => {
                    console.log(err)
                })
            }
            )
        }
    }
    )
    }
createAdminUser()



// function createProduct(){
//     Product.findOne({
//         name: 'product1',
//     }).then(product => {
//         if (!product) {
//             const product = new Product({
//                 name: 'product1',
//                 producer: ObjectId('5f9b4f1c3d4b6e0017d1b9c4'),
//                 price: 100,
//                 motorType: ObjectId('5f9b4f1c3d4b6e0017d1b9c5'),
//                 description: 'description',
//                 imageUrl: 'imageUrl'
//             })
//             product.save().then(product => {
//                 console.log('Product created')
//             }).catch(err => {
//                 console.log(err)
//             })
//         }
//     }
//     )
//     }   