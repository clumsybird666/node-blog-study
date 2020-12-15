const koa = require('koa')
const Router = require('koa-router')
const DB = require('./db')
// 实例化
const app = new koa()
const router = new Router()
router.get('/',async (ctx)=>{
  let res = await DB.find('student',{})
  console.log(res);
  ctx.body = {
    res: res
  }
})
router.get('/insert',async (ctx)=>{
  let res = await DB.insert("student",{"name":"yuanxiaoshen2","age":23,"sex":"男"})
  console.log(res);
  ctx.body = {
    res
  }
})
router.get('/update',async (ctx)=>{
  let res = await DB.update("student",{"name":"shenweijian"},{"name":"weijian"})
  console.log(res);
  ctx.body = {
    res
  }
})


//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
