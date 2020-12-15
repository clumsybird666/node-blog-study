const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'test';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  if(err){
    return
  }
  const db = client.db(dbName);
  //增加数据
  // db.collection('student').insertOne({"name":"shenweijian","age":33,"sex":"女"},function(err,res){
  //   if(!err){
  //     console.log('增加数据成功');
  //   }
  // })
  //查找啊数据
  const res = db.collection('student').find({})
  res.toArray((err,docs)=>{
    console.log(docs);
  })
  console.log(res);
  client.close();
});