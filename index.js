const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const {sign, authenticate, verify} = require('./util/auth')
const app = new Koa()
app.use(cors({
  credentials: true
}))
// 初始化数据库
const User = require('./models/user')
const Gatekeeper = require('./models/gatekeeper')

// 会向User表中插入gate字段
Gatekeeper.hasOne(User, {as: 'gate', foreignKey: 'gate'})

router.post(
  '/api/user/login',
  async ctx => {
    const {body} = ctx.request
    const {username, password} = body
    const user = await User.findOne({
      where: {username}
    })
    if (!user) ctx.body = {msg: 'user not find', code: 1, data: ''}
    else {
      const info = await authenticate(username, password)
      if(info) {
        ctx.body = {
          msg: 'success',
          data: {
            jwt: sign(info.id),
            username: info.username,
            uid: info.id,
            cover: info.cover
          },
          code: 0
        }
      }
    }
  })

router.post('/api/user/register',
  async ctx => {
    const {body} = ctx.request
    const {username, password} = body
    const user = await User.findOne({
      where: {username}
    })
    if (user) ctx.body = {msg: 'user is exist.', code: 1, data: ''}
    else {
      const new_user = await User.create({username,password})
      if(new_user.id){
        ctx.body = {
          msg:'success',
          data:{
            jwt:sign(new_user.id),
            username: new_user.username,
            uid: new_user.id,
            cover: new_user.cover
          },
          code:0}
      }
    }
  })

router.post(
  '/api/user/auth',
  async ctx=>{
    const {body} = ctx.request
    const token = body.token
    const data = verify(token)
    ctx.body = {
      msg:'success',
      data:{
        username: data.username,
        uid: data.id,
        cover: data.cover
      },
      code:0}
  }
  )
app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(router.routes())
app.use((ctx,next)=>{
  console.log(ctx.body)
  next()
})
app.use(router.allowedMethods())
app.listen(5000)