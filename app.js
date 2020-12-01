const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { request } = require('http')
const { rejects } = require('assert')
const { resolve } = require('path')
//session数据
const SESSION_DATA
const getPostDate = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}
const serverHandle = (req, res) => {
  // console.log(req);
  res.setHeader('Content-type','application/json')
  //解析query
  req.query = querystring.parse(req.url.split('?')[1])
  //解析cookie
  req.cookie= {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if(!item){
      return
    }
    const arr = item.split('=')
    const key = arr[0]
    const value = arr[1]
    req.cookie[key]=value
  });
  console.log(req.cookie);
  //解析session
  const userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  }else{
    userId = Date().now()
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
  
  getPostDate(req).then(postData => {
    console.log(postData);
    req.body = postData
    //处理blog路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      console.log(blogData);
      res.end(
        JSON.stringify(blogData)
      )
      return
    }
    //处理用户路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
      return
    }
    //未命中路由
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
  })




}
module.exports = serverHandle