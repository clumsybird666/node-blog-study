const koa = require('koa')
const Router = require('koa-router')

// 实例化
const app = new koa()
const router = new Router()

router.get('/',async (ctx)=>{
  const query = ctx.query
  ctx.body = {
    query
  }
}).get('/new/:id',async(ctx)=>{
  const id = ctx.params
  ctx.cookies.set('name','yuanxiaoshen')
  console.log(ctx.cookies.get('name'));
  ctx.body = {
    id
  }
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
