---
title: 如何用 JavaScript 下载文件
tags:
  - 如何用 JavaScript 下载文件
id: 2417
categories:
  - JS/Jq
date: 2016-07-10 21:43:51
---

### 简介

&emsp;&emsp;我们知道，下载文件是一个非常常见的需求，但由于浏览器的安全策略的限制，我们通常只能通过一个额外的页面，访问某个文件的 url 来实现下载功能，但是这种用户体验非常不好。
幸好，HTML 5 里面为```<a>```标签添加了一个 download 的属性，我们可以轻易的利用它来实现下载功能，再也不需要用以前的笨办法了。

### 原理

&emsp;&emsp;我们先看看 download 的使用方法：
```<a href="http://grycheng/grycheng.zip" download="filename.zip">Download file</a>``
看看上面的代码，只要为 ```<a>``` 标签添加 download 属性，我们点击这个链接的时候就会自动下载文件了~
顺便说下，download 的属性值是可选的，它用来指定下载文件的文件名。像上面的例子中，我们下载到本地的文件名就会是 filename.zip 拉，如果不指定的话，它就会是 somefile.zip 这个名字拉！
看到这里，你可能会说，坑爹啊，这明明是用 HTML 5 的新特性来实现下载文件嘛，说好的用 JavaScript 下载文件呢？
事实上，用 JavaScript 来下载文件也是利用这一特性来实现的，我们的 JavaScript 代码不外乎就是：
用 JavaScript 创建一个隐藏的 ```<a>``` 标签
设置它的 href 属性
设置它的 download 属性
用 JavaScript 来触发这个它的 click 事件
翻译成 JavaScript 代码就是：
```javascript
var a = document.createElement('a');
var url = window.URL.createObjectURL(blob);
var filename = 'what-you-want.txt';
a.href = url;
a.download = filename;
a.click();
window.URL.revokeObjectURL(url);
```

## window.URL

**window.URL 里面有两个方法：**

&emsp;&emsp;createObjectURL 用 blob 对象来创建一个 object URL(它是一个 DOMString)，我们可以用这个 object URL 来表示某个 blob 对象，这个 object URL 可以用在 href 和 src 之类的属性上。
revokeObjectURL 释放由 createObjectURL 创建的 object URL，当该 object URL 不需要的时候，我们要主动调用这个方法来获取最佳性能和内存使用。
知道了这两个方法之后，我们再回去看看上面的例子就很容易理解了吧！只是用 blob 对象来创建一条 URL，然后让```<a>```标签引用该 URL，然后触发个点击事件，就可以下载文件了！
那么问题来了，blob 对象哪里来？

## Blob 对象

&emsp;&emsp;Blob 全称是 Binary large object，它表示一个类文件对象，可以用它来表示一个文件。根据 MDN 上面的说法，File API 也是基于 blob 来实现的。
由于本文的主题是讲 JavaScript 下载文件，那我们构建 blob 的方式就是通过服务器返回的文件来创建 blob 拉！
而最简单的方式就是用 fetch API 了，我们可以整合上面的例子：
```javascript
fetch('http://somehost/somefile.zip').then(res => res.blob().then(blob => {
var a = document.createElement('a');
var url = window.URL.createObjectURL(blob);
var filename = 'myfile.zip';
a.href = url;
a.download = filename;
a.click();
window.URL.revokeObjectURL(url);
}))
```
很简单对吧！
你可能会问，何必这么麻烦呢？直接写成下面这样不就好了：
```<a href="http://grycheng/grycheng.zip" download="myfile.zip">Download file</a>```

### 限制一：不同浏览器对 blob 对象有不同的限制

具体看看下面这个表格（出自 FileSaver.js）：
![js下载文件](http://www.npm8.com/wp-content/uploads/2016/07/1-1-660x302.png)

### 限制二：构建完 blob 对象后才会转换成文件

&emsp;&emsp;这一点限制对小文件(几十kb)可能没什么影响，但对稍微大一点的文件影响就很大了。试想，用户要下载一个 100mb 的文件，如果他点击了下载按钮之后没看到下载提示的话，他肯定会继续按，等他按了几次之后还没看到下载提示时，他就会抱怨我们的网站，然后离开了。
然而事实上下载的的确确发生了，只是要等到下载完文件之后才能构建 blob 对象，再转化成文件。而且，用户再触发多几次下载就会造成一些资源上的浪费。
因此，如果是要下载大文件的话，还是推荐直接创建一个 ```<a>``` 标签拉~
写 html 也好，写 JavaScript 动态创建也好，用自己喜欢的方式去创建就好了。

### 动态文件

&emsp;&emsp;动态生成文件然后返回给客户端也是一个很常见的需求，譬如我们有时候需要做导出数据的功能，把数据库中的某些数据导出到 Excel 中，然后再返回客户端。
这时候我们就不能简单的指定 href 属性，因为对应的 URL 并不存在。
我们只能通过 JavaScript 对服务器发出一个请求，通知它去生成某个文件，然后把对应的 URL 返回给客户端。
有没有感觉这个过程和上面「权限校验」一节很像？肯定拉，因为我们只是对 URL 做了一些预处理而已嘛~

### 注意事项

由于 download 属性是 HTML 5 的新特性，因此它不支持旧版本的浏览器。

### 总结

HTML 5 新的 download 特性真的很好用，结合 JavaScript 的动态能力我们可以很方便的做出复杂的下载功能~