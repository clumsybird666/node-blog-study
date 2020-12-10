const koa = require('koa')
const app = new koa()
// 中间件
app.use( async (ctx)=> {
  ctx.body= '你好'
} )
app.listen(3000)