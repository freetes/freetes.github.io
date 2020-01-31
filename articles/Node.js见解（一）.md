## 引言

* Node.js 是什么？
* 如何学习 Node.js
* 如何使用 Node.js

## 前言

前端后台(全栈)开发是一个锻炼**「编程思维」**很好的途径。

前端三剑客：HTML、CSS、JavaScript，没有其它选择。而后台编程语言很多，如最火的JAVA，新晋的GO，以及本文主角 **Node.js。**

## Node.js 是什么?

>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. 

简单的说 Node.js 就是运行在服务端的 JavaScript，所以在掌握前端开发下，无需学习其它后台语言，即可完成全栈开发。何乐而不为？拥有以下特性：

* 异步I/O机制；
* 事件驱动；

## 如何学习 Node.js?

学会 JavaScript，即学会了 Node.js。先要对 JavaScript 有一个整体的认识，JavaScript 是一个脚本语言，类比 Python，同时和 Python一样，JavaScript 也是一个弱类型语言，函数为第一公民。

普遍认识的 JavaScript 是运行在浏览器端，Node.js则是运行在服务端的JavaScript，两者唯一的区别在于运行环境提供的全局变量，浏览器端有window、document等，而服务器端有process等。

同时和其它编程语言一样，需要多多动手编码。**量变终会引发质变**！

## 如何使用 Node.js?

先解释一个专有名词：**异步事件驱动。**

**异步(Async)**：与同步相反，与多线程不同，异步单线程，代码分为现在时、未来时、未来的未来时。

**事件(Event)**：浏览器端里有鼠标点击事件、键盘事件等，当触发相关事件时，会调用对应的处理函数，即**回调函数。**

**事件循环(Event Loop)**：代码（现在时）执行完毕后，运行环境会自动休眠，如果有激活动作，运行环境会执行未来时代码，然后休眠，以此循环。在 JavaScript 运行环境中，现在时指的是全部代码，未来时指事件监听的回调函数。

![图片](https://uploader.shimo.im/f/l7elRhd1qBsyR9zP.png!thumbnail)

在Node.js中，服务器端的事件是一次URL请求，每次在客户端输入URL按下回车就会触发该事件，这时回调函数会对请求(request)数据进行处理，然后返回响应数据(response)，即完成一次前端后台操作：客户端（浏览器）提交URL请求，服务器端（Node.js）触发事件回调处理函数（回调函数：特别重要的词）。

除服务器端外，Node.js 还作为开发工具的依赖环境。目前主流的前端开发框架如 React.js、Vue.js 等全都是在 Node.js 的基础上运行，无一例外。

至于如何安装Node.js，自行百度，不予叙述。

ps：当一个框架被广泛使用时，其思想必定就很有趣了，如 Vue.js 框架将前端开发模块化，如下图所示：

![图片](https://uploader.shimo.im/f/WvxDzppZ0MgU8kVr.png!thumbnail)


其中每个模块的源码为 .vue 结尾的文件，那是不是和之前说到的前端只能用 HTML、CSS、JavaScript有所斥呢？并不是的，vue只是源代码，要想在浏览器看到网页，.vue会被Node.js经过拆解打包成html、css、js，这时候就会用到webpack（很多名词没听过？可以自行百度）。目前主流的前端开发和 Node.js 完全耦合，所以学习 Node.js 完全必要！

### 服务器端“hello world”代码示例

```
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const handler = function (req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
}
const server = http.createServer(handler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

在上面的“hello world”示例中，每次在浏览器输入  http://localhost:3000  都会给服务器发送一次请求，服务器端被动触发回调函数（handler）。在回调函数里，代码先设置响应状态码，设置响应头信息，最后返回“Hello World\n”原始字符串。
用异步事件驱动来解释：Node.js注册了一个事件，当有来自  http://localhost:3000  的http请求时，会触发回调函数，和前端网页里鼠标点击事件、键盘事件完全一样。

## 最后
使用Node.js开发中，不乏会涉及到命令行的各种指令，请不要反对它，命令行是必须掌握的工具。加油～

## 相关资源
* [什么是 Event Loop? - 阮一峰](http://www.ruanyifeng.com/blog/2013/10/event_loop.html)
* [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
* [Node.js 官方文档](https://nodejs.org/en/)
