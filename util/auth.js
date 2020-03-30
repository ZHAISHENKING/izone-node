const jwt = require('jsonwebtoken')
// const token = require('koa-jwt')
const secret = 'abchghghhnnbkd'
const User = require('../models/user')

function sign(user){
  return jwt.sign({
    data:{
      username: user.username,
      uid: user.id,
      cover: user.cover
    },
    exp: Math.floor(Date.now()) + 60 * 60
  }, secret)
}

async function authenticate(username, password){
  const user = await User.findOne({
    where: {
      username: username,
      password: password
    }
  })
  return user
}

function verify(token){
  return jwt.verify(token, secret)
}

module.exports = {
  sign,
  authenticate,
  verify
}