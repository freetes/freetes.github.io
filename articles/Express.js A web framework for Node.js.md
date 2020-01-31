## 引言

* 一个简单的例子：原生 node 做路由转发；
* What is Express.js？
* 用 Express.js 做路由转发。

## 原生代码做一个简单的路由转发

```
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(handler);

// 分发器
function handler(req, res){
  console.log(req.url)
  // 判断路由，分发处理器
  if(req.url == '/'){
    return getHomePage(req, res)
  }
  else if(req.url == '/test'){
    return getTestPage(req, res)
  }
}

// GET /
function getHomePage(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is a home page');
}
// GET /test
function getTestPage(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is a test page');
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

在第一次代码的基础上增加了一个简单的判断语句，所有的请求事件都会在 handler 函数里进行分发，判断其请求地址，再分发给指定函数处理。其实这就是一种简单的 MVC 里的 「C」(controller)。

## What is Express.js?

>Fast, unopinionated, minimalist web framework for Node.js

Express.js is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language (like EJS, Jade, and Dust.js).

You can then use a database like MongoDB with Mongoose (for modeling) to provide a backend for your Node.js application. Express.js basically helps you manage everything, from routes, to handling requests and views.

## 用 Express.js 做路由转发

```
const express = require('express')
const app = express()

app.get('/', function (req, res){
  res.send('This is a home page') 
})
app.get('/test', function (req, res){
  res.send('This is a test page')
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
```

和原生代码比起来，更简单易懂。用 node 写一个服务器就这么简单，无需第三方服务器 tomcat。同时 Express.js 也极其轻便，容易扩展，还有其它种种可以自行探索。

最后一个  ()=>console.log('')  是不是没见过，这是 ES6(js版本代号) 的箭头函数，可以理解为一个匿名函数，但是更加简洁，等价于  function (){ console.log('') } 。

## 相关资源

* [Express.js 官方文档](http://www.expressjs.com.cn/)
* [MVC 架构图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)
* [基于 MVC 架构的 Express 项目文件目录示例](https://github.com/freetes/Express-Template)

## 有趣的

* [https://shimo.im/docs/3mtKTp9hg8AfgPva](https://shimo.im/docs/3mtKTp9hg8AfgPva)
* [https://shimo.im/docs/Ap2wZsYp8KETMqKG](https://shimo.im/docs/Ap2wZsYp8KETMqKG)
