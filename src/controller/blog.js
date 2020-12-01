const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'a',
      content: 'b',
      createTime: 156462348763,
      author: ''
    },
    {
      id: 2,
      title: 'b',
      content: 'b',
      createTime: 156462348761,
      author: ''
    }
  ]
}
const getDetail = (id) => {
  return [
    {
      title: 'qqqqqqqqqqqqqqqq',
      content: '这里是内容'
    }]
}
const newBlog = (blogData = {}) => {
  //blogData是一个博客对象，
  return {
    id: 3
  }
}
const updateBlog=(id,blogData={})=>{
  return {
    msg:'更新成功',
    id:id,
    blogData:blogData
  }
}
const delBlog=(id)=>{
  return {
    msg:'删除成功'
  }
}
module.exports = { getList, getDetail, newBlog ,updateBlog,delBlog}

 