const {userLogin} =require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
//获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 60 * 60 * 24 * 1000)
  console.log(d.toGMTString());
  return d.toGMTString()
}
const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  if (method === 'GET' && path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    let result = userLogin(username, password)
    if(result){
      res.setHeader('Set-Cookie',`username=${username};path=/;httpOnly;expires=${getCookieExpires()}`)
      return new SuccessModel()
    }
    return new ErrorModel()
  }
  if(method==='GET' && path==='/api/user/logintest'){
    console.log(req.cookie.username);
    if(req.cookie.username){
      return new SuccessModel('登录成功')
    }
    return new ErrorModel('未登录')
  }
}
module.exports = handleUserRouter