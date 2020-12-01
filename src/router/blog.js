const {getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  console.log(path);
  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    let dataBlog = getList(author, keyword)
    return new SuccessModel(dataBlog)
  }
  //查询博客详情
  if(method==='GET' && path === '/api/blog/detail'){
    let id = req.query.id || ''
    let dataBlog = getDetail(id)
    return new SuccessModel(dataBlog)
  }
  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogData = req.body
    let data= newBlog(blogData)
    return new SuccessModel(data)
  }
  //更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const blogData = req.body
    let data = updateBlog(req.query.id,blogData)
    return new SuccessModel(data)
  }
  //删除博客
  if(method==='GET' && path === '/api/blog/del'){
    let id = req.query.id || ''
    let dataBlog = delBlog(id)
    return new SuccessModel(dataBlog)
  }
}
module.exports = handleBlogRouter