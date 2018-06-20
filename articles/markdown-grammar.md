## 段落

```html
这个文档自身就是使用 Markdown 编写的
Markdown 允许你通过编写易读、易写的富文本格式，然后很方便就可以转换成有效的 HTML。
```

效果如下：
这个文档自身就是使用 Markdown 编写的
Markdown 允许你通过编写易读、易写的富文本格式，然后很方便就可以转换成有效的 HTML。

## 标题

```html
# h1标题

将被转换成

<h1>h1标题</h1>

## h2标题 == <h2>h2标题</h2>
......etc
###### h6标题 == <h6>h6标题</h6>
```

效果如下：
# h1标题
## h2标题
### h3标题
#### h4标题
##### h5标题
###### h6标题

## 强调

```html
**这就是高富帅啊**

将被转换成

<b>这就是高富帅啊</b>

__这就是高富帅啊__ == <b>这就是高富帅啊</b>
```

效果如下：
**这就是高富帅啊**

## 文本超链接

```html
[我的博客](https://freetes.github.io)

将被转换成

<a href="https://freetes.github.io">我的博客</a>
```

效果如下：
[我的博客](https://freetes.github.io)

## 图片

```html
![GitHub的Logo](./public/img/github.jpg)

将被转换成

<img src=".\public\img\github.jpg" alt="GitHub的Logo">
```

效果如下：

![GitHub的Logo](./public/img/github.jpg)

## 列表

#### 有序列表

```html
1. Hello
2. World

将被转换成

<ol>
  <li>Hello</li>
  <li>World</li>
</ol>
```

效果如下：
1. Hello
2. World

#### 无序列表

```html
* Hello
* World

将被转换成

<ul>
  <li>Hello</li>
  <li>World</li>
</ul>
- Hello == * Hello

```

效果如下：
* Hello
* World

## 引用

```html
> 段落前面添加大于号和空格，就能形成引用段落

将被转换成

<blockquote>
  <p>段落前面添加大于号和空格，就能形成引用段落</p>
</blockquote>
```

效果如下：
> 段落前面添加大于号和空格，就能形成引用段落

## 内联代码

```html
`内联代码`

将被转换成

<code>内联代码</code>
```
效果如下：
`内联代码`

## 代码块

```c
|```c // 这里是代码的语言类型
|//将代码用 ``` 包含起来即可
|print("helloworld")
|```
```
将被转换成
```html
<pre data-role="codeBlock" data-info="c" class="language-c"><span class="token comment">//将代码用 ``` 包含起来即可</span>
<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"helloworld"</span><span class="token punctuation">)</span>
</pre>
```

效果如下：
```c
//将代码用 ``` 包含起来即可
print("helloworld")
```

## 水平分割线

```markdown
三个或更多的星号或横杠
***
---
*****
------
```
将被转换成
```html
<hr>
```

效果如下：
***