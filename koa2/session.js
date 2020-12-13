const koa = require('koa')
const Router = require('koa-router')
const session = require('koa-session')

const app = new koa()
const router = new Router()

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
 
app.use(session(CONFIG, app))

router.get('/',async(ctx)=>{
ctx.body = {
  username:ctx.session.username
}
})
router.get('/login',async(ctx)=>{
  ctx.session.username='yuanxiaoshen'
  ctx.body = '登录成功'
})
//启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000) 