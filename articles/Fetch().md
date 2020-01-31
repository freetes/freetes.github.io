## 前言

基于 HTTP 的最常用 API 是 XMLHttpRequest API，可用于在 user agent 和服务器之间交换数据。 现代Fetch API提供相同的功能，具有更强大和灵活的功能集。

Fetch API 提供了一个获取资源的接口（包括跨域请求）。任何使用过 XMLHttpRequest 的人都能轻松上手，而且新的 API 提供了更强大和灵活的功能集。

它同时还为有关联性的概念，例如 CORS 和 HTTP 原生头信息，提供一种新的定义，取代它们原来那种分离的定义。

发送请求或者获取资源，需要使用 WindowOrWorkerGlobalScope.fetch() 方法。它在很多接口中都被实现了，更具体地说，是在 Window 和 WorkerGlobalScope 接口上。因此在几乎所有环境中都可以用这个方法获取到资源。

 fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 Promise 对象，resolve 对应请求的 Response。

## 基本概念

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的部分，例如请求和响应。它还提供了一个全局 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

这种功能以前是使用  [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)实现的。Fetch 提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 `Service Workers`。Fetch 还提供了单个逻辑位置来定义其他 HTTP 相关概念，例如 CORS 和 HTTP 的扩展。

请注意，`fetch`规范与`jQuery.ajax()`主要有两种方式的不同，牢记：

- 当接收到一个代表错误的 HTTP 状态码时，从 `fetch()`返回的 Promise **不会被标记为 reject，** 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 `ok` 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- `fetch()` **不会接受跨域 cookies；**你也不能使用`fetch()` 建立起跨域会话。其他网站的`Set-Cookie`头部字段将会被无视。
- `fetch` **不会发送 cookies**。除非你使用了*credentials*的 [初始化选项](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)。（自2017年8月25日以后，默认的credentials政策变更为`same-origin`。Firefox也在61.0b13版本中，对默认值进行修改）

## 进行 fetch 请求 

一个基本的 fetch 请求设置起来很简单。看看下面的代码：

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

这里我们通过网络获取一个 JSON 文件并将其打印到控制台。最简单的用法是只提供一个参数用来指明想`fetch()`到的资源路径，然后返回一个包含响应结果的 promise(一个 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象)。

当然它只是一个 HTTP 响应，而不是真的 JSON。为了获取 JSON 的内容，我们需要使用 [`json()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Body/json)方法（在[`Body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)mixin 中定义，被 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 和 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象实现）。



