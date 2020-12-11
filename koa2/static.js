const koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')

const app = new koa()
app.use(static(__dirname+'/static'))
router.get('/',async(ctx)=>{
  ctx.body = {
    data:'1'
  }
})

//启动路由
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000,()=>{
console.log('启动成功')
})