const koa = require(koa)
const Router = require('koa-router')
const session = require('koa-session')

const app = new koa()



//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000) 