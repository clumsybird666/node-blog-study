const env = process.env.NODE_ENV  //环境参数
let REDIS_CONFIG
REDIS_CONFIG = {
  port: '6379',
  host: '127.0.0.1'
}
module.exports = { REDIS_CONFIG }
