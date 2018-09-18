这几天在完善博客的时候，遇到了一个坑：如何伪造指定文章的 url？

> Web端实现路由有如下两种技术模式。
> * 基于Hash
> * 基于History API
>
>Hash 路由的路径中会有一个“ # ”标志，即常说的锚点，前端向后端服务器发送请求时并不会解析Hash部分。
>
>History API 通过监听HTML 5添加的popstate事件实现路由，URL格式和传统的后端路由一致，这也是这种模式最大的有点。缺点是只有新型浏览器支持该特性，且需要后端路由配合，因为当用户访问一个History路由实现的路径时，页面仍会向后端发送请求，同时会触发网页重载。

由于此博客是放在 GitHub Pages 上，没有后台服务器的支持，无法通过服务器端SSR实现。

毫不犹豫的选择了基于Hash的模式，其优点如下：
* 改变#不会触发网页重载

  > 完美的实现了动态加载
* 改变#会改变浏览器的访问历史

  > 可用于网页后退前进功能的实现

**理清操作流程**

1. 用户输入 url
2. 从输入的 url 里获取 hash，并解密  
    `decodeURIComponent(location.hash)`
3. 用解密后的 hash 值与 list-item 进行匹配，如果匹配成功就点击当前 item，未成功则点击 list 的第一个 item  
4. url 导航指定文章完成
5. 用户点击某个 item 时，改变 location.hash 为当前 item 的 ID 值

**代码实现**

1. 用解密后的hash和list-item进行匹配，如果匹配成功就点击当前item，未成功则点击list的第一个item
```javascript
// 根据URL#后的参数找到对应的文章并点击
// 伪造搜索功能
if(decodeURIComponent(location.hash)){
  for(let item of $('.list').children()){
    if(item.id == decodeURIComponent(location.hash))
      return $(item).click()
  }
}
$('.list').children().first().click()
```
2. 用户点击某个item时，改变location.hash为当前item的ID值
```javascript
location.hash = node.id
```
3. 监听url的变换，实现网页后退前进功能
```javascript
window.onhashchange = function () {
  if(decodeURIComponent(location.hash)){
    for(let item of $('.list').children()){
      if(item.id == decodeURIComponent(location.hash))
        return $(item).click()
    }
  }
}
```
***
到此，伪造url功能完成

测试：
* [Markdown语法 https://freetes.github.io/#Markdown语法](https://freetes.github.io/#Markdown语法)
* [浅谈如何使用GitHub https://freetes.github.io/#浅谈如何使用GitHub](https://freetes.github.io/#浅谈如何使用GitHub)
* [关于我 https://freetes.github.io/#关于我](https://freetes.github.io/#关于我)

## 参考文献

[MDN web docs: API/Location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)