const redis = require('redis')
const { REDIS_CONFIG } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.host)
redisClient.on('error',(err)=>{
  console.log(err);
})
//设置
function set(key,val){
  if(typeof val === 'object'){
    val = JSON.stringify(val)
  }
  redisClient.set(key,val,redis.print)

}
//取
function get(key){
  const promise = new Promise((resolve,reject)=>{
    redisClient.get(key,(err,val)=>{
      if(err){
        return
      }
      if(val==null){
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        console.log(err);
      }
    })
    return promise
  })
}
module.exports={
  set,get
}