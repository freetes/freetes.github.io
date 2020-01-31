## 引言

* 安装
* NPM
* 常用的命令行指令
* 解释 package.json
* 工程目录示例

## 前言

Node.js（以下简称 node）是跨平台的，解释性语言，服务器上部署非常简单。和 Python 的 pip 一样，node 拥有自己的模块管理器，npm --- Node.js Package Manager。

## 安装
node Windows 安装包 [下载地址](http://nodejs.cn/download/)

```
// 打开 cmd ，输入下列命令
// 测试 node 是否安装成功
node -v
// 测试 npm 是否安装成功
npm -v
```

## NPM

全称：Node.js Package Manager

常用的命令

```
// 安装包到项目，本地安装
npm install <Module Name>
// 全局安装
npm install -g <Module Name>
// 可简写为
npm i <Module Name>
// 卸载包，本地(全局)
npm uninstall (-g) <Module Name>
```

* 本地安装：项目依赖模块

1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录；

2. **可以通过 require('Module Name') 来引入本地安装的包**；

* 全局安装：一般都是命令行指令工具集

1. 将安装包放在 /usr/local 下或者 node 的安装目录；

2. **可以直接在命令行里使用，但不能通过 require() 引入**，所以 node 可编写命令行工具，有兴趣可以试试。

## 解释 package.json

package.json 位于项目的根目录下，常见的结构如下：

```
{
  "name": "test",              // 项目名称
  "version": "0.0.1",          // 项目版本
  "scripts": {                 // npm scripts
    "start": "node ./app.js"
  },
  "dependencies": {            // 依赖的包集
    "axios": "^0.18.0",        // 包名：版本号
    "body-parser": "~1.18.2",
    "connect-multiparty": "^2.2.0",
    "express": "~4.15.5",
    "mongoose": "^5.2.5",
    "nodemailer": "^4.6.7",
    "pug": "^2.0.3",
    "serve-handler": "^6.0.0"
  }
}
```

* "scripts": npm 自带的脚本，npm start 与 node ./app.js 完全一致，所以 npm start 可以理解程是后者的一个引用；
* "dependencies": 项目依赖的包集，在 npm install 后会自行改变，所以无需自行编辑。

## 基于 Express.js 项目工程目录

```
> controller       // 控制器：MVC(C)
> model            // 数据模型：MVC(M)
> node_modulers    // 项目模块依赖库：npm i <Module Name> 会自动生成
> public           // 静态资源文件夹
  > js
  > css
  > img
  > ...
> router           // 路由器
> utils            // 工具集：可以包含像 日期转换函数 等工具函数
> view             // 视图层：MVC(V)
  app.js           // 项目启动文件
  package.json     // 项目配置文件
```

经验所得，可以作为前期的参考标准。

## 最后

这篇文章本该在 Express 之前发出，但有些标准不是很确定，所以浪费了大部分时间在确定名词正确性上。

## Resource

* [Node.js见解（一）](https://shimo.im/docs/1hJIBXaOoeoIwKuj/)
* [阮一峰的 Node.js 概述](http://javascript.ruanyifeng.com/nodejs/basic.html)
* [package.json 官方解释](https://docs.npmjs.com/files/package.json)
* [npm 官方文档](https://docs.npmjs.com/getting-started/)
