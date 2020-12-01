const http = require('http')
const Port = 3000
const serverHandle = require('../app')
const server = http.createServer(serverHandle)
server.listen(Port,()=>{
  console.log('serve is start');
})