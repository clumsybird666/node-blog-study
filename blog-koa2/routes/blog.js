const router = require('koa-router')()

router.prefix('/api/blog/add')

router.get('/', function (ctx, next) {
  const query = ctx.query
  const request = ctx.request
  const requestString = request.querystring
  ctx.body = {
    code:1,
    query,
    requestString,
    msg:'success'
  }
})


module.exports = router
