const koa = require('koa')

const router = require('koa-router')()

const app = new koa()

router.get('/',async(ctx) => {
  ctx.cookies.set('name','yuanxiaoshen',{
    maxAge:60*1000*60
  })
  ctx.body = {
    code:1
  }
})
router.get('/getcookie',async(ctx)=>{
  const cookie = ctx.cookies.get('name')
  ctx.body = {
    cookie:cookie
  }
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000,()=>{
  console.log('serer is start');
})