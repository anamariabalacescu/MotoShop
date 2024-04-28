
var express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var router = express.Router();
require('dotenv').config()
var User=require('../schemas/userSchema')
var ObjectId = require('mongodb').ObjectID;
const { USER_TYPES, switchUserSecret } = require('../utils/enums')
const { getTokenFrom } = require('../utils/auth')



/* GET users listing. */
router.get('/tokenLogin/:token', async function(req, res, next) {
  const token = req.params.token
  console.log('token', token)
  if (!token) {
    return res.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_CLIENT)
    console.log('decodedToken', decodedToken)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const id = decodedToken.id 
    const user = await User.findById(id)
    res.send(user)
  } catch (error) {
    try {
      const decodedTokenAdmin = jwt.verify(token, process.env.SECRET_ADMIN)
      console.log('decodedTokenAdmin', decodedTokenAdmin)
      if (!decodedTokenAdmin.id) {
          return res.status(401).json({ error: 'token invalid' })
      }
      const id = decodedTokenAdmin.id
      const user = await User.findById(id)
      res.send(user)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  }
});


router.post('/login', async function(req, res, next) {
  try {
  const body = req.body
  const user = await User.findOne({ email: body.email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  console.log('user found', user)
  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, switchUserSecret(user.type))
  console.log('token', token)
  res
    .setHeader('Authorization', `Bearer ${token}`)
    .status(200)
    .send({
       id: user._id,
       email: user.email, 
       name: user.name,
       type:user.type,
       address: user.address,
       token: token
      })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'invalid username or password' })
  }
});
router.post('/register', async  function(req, res, next) {
  const body = req.body
  //ading a user
  const user1 = await User.findOne({ email: body.email })
  if (user1) {
    return res.status(401).json({
      error: 'username already exist'
    })
  }

  const saltRounds = 10;
  
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log('Registering user', body)
  const user=new User({
    name:body.name,
    email:body.email,
    password:passwordHash,
    type: USER_TYPES.CLIENT,
    address : body.address
  })

  user.save().then(res=>{console.log('user add'+res)})

  const userForToken = {
    email: user.email,
    id: user._id,
  }
  
  const token =  jwt.sign(userForToken, switchUserSecret( USER_TYPES.CLIENT))
  res
  .setHeader('Authorization', `Bearer ${token}`)
  .status(200)
  .send({
     id: user._id,
     email: user.email, 
     name: user.name,
     type:user.type,
     address:user.address,
     token: token
    })
});


router.delete('/:id', async function(req, res, next) {

  const token = getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_ADMIN)

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(ObjectId(req.params.id))
    user.delete();
    res.send('User deleted succefull');
  } catch (errorr) {
      console.log(errorr)
      return res.status(401).json({ error: 'you are not admin '+errorr })
  }

});


router.get('/all', function(req, res, next) {
  const token = getTokenFrom(req)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_ADMIN)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    User.find({}).then(users=>res.send(users));
    
  } catch (errorr) {
      return res.status(401).json({ error: 'you are not admin '+errorr })
  }
});

// get all producers 
router.get('/producers', function(req, res, next) {
  User.find({type: USER_TYPES.PRODUCER}).then(users=>res.send(users));
});

// get producer by id
router.get('/producer/:id', function(req, res, next) {
  User.findById(ObjectId(req.params.id)).then(user=>res.send(user));
});

module.exports = router;
