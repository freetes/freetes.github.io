## 引言

* 数据库基础
* What is MongoDB?
* How to use it in Node.js?
* An example.

## 数据库基础知识

前端是和用户打交道，而服务器端（ node ）则是与数据打交道。

目前比较知名的数据库有：

* MySQL：关系型数据库；
* MongoDB：NoSQL(非关系型)数据库，文档型数据库，直接返回 JSON 格式；

## What is MongoDB?

>MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need.

MongoDB 将数据存储为一个文档(Document)，数据结构由键值对(key=>value)组成。MongoDB 数据文档和 JSON 对象一样，返回值为 JSON 格式，所以在 JavaScript 里使用非常合适。

## How to use it in Node.js?

在 Java 里连接 MySQL 得用 JDBC ，同样在 Node.js 连接 MongoDB 用到了 **mongoose**。

先新建数据模式 Schema，对应于 Java 里的 DTO 层，再转换为数据模型 model，相当于创建了 DTO 实例：

| 编程语言   | 数据库   | 连接工具   | 数据模式   | 数据模型   | 
|:----|:----|:----|:----|:----|
| Java   | MySQL   | JDBC   | DTO   | new DTO()   | 
| Node.js   | MongoDB   | mongoose   | Schema   | model   | 

1. 下载并安装 MongoDB，官网地址：[MongoDB 官网](https://www.mongodb.com/)；

2. 使用  npm install mongoose  命令安装 mongoose 模块到项目；

3. 连接数据库：

```
// 引入模块
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://@localhost:27017/dbName', err=>{
  if(err)
    console.log("Failed to connect MongoDB Server!");
  else
    console.log("Succeed in connecting MongoDB Server!");
});
```

1. 创建数据模型：

```
const Schema = mongoose.Schema;

// 创建用户数据模式
const UserSchema = new Schema({
  name: String,
  gender: Number,
  email: String,
});

// 用户数据模型
const User = mongoose.model('User', UserSchema);
```

1. CRUD操作：增删改查

* 增：create

```
User.create({
  name: 'Ming',
  gender: 0,
  email: 'ming@gmail.com'
})
```

  * 查：find

```
User.find({
  name: 'Ming'
})
```

  * 改：update

```
User.update({
  name: 'Ming'
}, {
  name: 'Red'
})
```

  * 删：remove

```
User.remove({
  name: 'Ming'
})
```

## 一个简单的项目实例

[源代码地址](https://send.firefox.com/download/3b4976abd6ad255c/#RPyVZ5dsrTfoWoRscEu2mA)

## 相关资源

* [MongoDB 官网](https://www.mongodb.com/)
* [MongoDB 可视化管理软件：Robo 3T](https://robomongo.org/)
* [MongoDB 教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
