const MongoClient = require('mongodb').MongoClient  //引入mongodb模块
const Config = require('./config')   //引入配置

// 定义类
class Db {

  static getInstance() { // 静态方法  使用单例模式
    if (!Db.instance) {
      Db.instance = new Db()
      // console.log('实例化DB类');
    }
    return Db.instance
  }

  constructor() {
    this.connect()   // 刚初始化时  就连接数据库
    this.dbClient = ''   // 连接对象
  }

  // 连接数据库方法
  connect() {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!_this.dbClient) {
        MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if (err) {
            reject(err)
          } else {
            _this.dbClient = client.db(Config.dbName)
            // console.log(_this.dbClient);
            resolve(_this.dbClient)
          }
        })
      } else {
        resolve(_this.dbClient);

      }
    })
  }

  // 查找数据方法
  find(collectionName, json) {
    // console.log(collectionName,json);
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).find(json)
        result.toArray((err, docs) => {
          if (err) {
            reject(err)
            return
          }
          resolve(docs)
        })
      })
    })
  }

  // 修改数据方法
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).updateOne(json1, { $set: json2 }, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

  // 插入数据方法
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        const result = db.collection(collectionName).insertOne(json, function (err, result) {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }

    // 删除数据方法
    remove(collectionName, json) {
      return new Promise((resolve, reject) => {
        this.connect().then(db => {
          const result = db.collection(collectionName).remove(json, function (err, result) {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
      })
    }
}


module.exports = Db.getInstance()