---
title: HTML+CSS：让IE渲染方式默认为最高
tags:
  - IE渲染
id: 172
categories:
  - 前端杂货
date: 2015-07-12 21:28:04
---

现在有很多人的IE浏览器都升级到IE9以上了，所以这个时候就有又很多诡异的事情发生了，例如现在是IE9的浏览器，但是浏览器的文档模式却是IE8:

为了防止这种情况，我们需要下面这段代码来让IE的文档模式永远都是最新的：```<meta http-equiv="X-UA-Compatible" content="IE=edge">```

也可以用下面的写法：

```<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">```


这段代码和上面相比后面加了一个**chrome=1**，这个[**Google Chrome Frame（谷歌内嵌浏览器框架GCF）**](http://zh.wikipedia.org/wiki/Google_Chrome_Frame)，如果有的用户电脑里面装了这个chrome的插件，就可以让电脑里面的IE不管是哪个版本的都可以使用**Webkit**引擎及**V8**引擎进行排版及运算，无比给力，不过如果用户没装这个插件，那这段代码就会让IE以最高的文档模式展现效果。

附带：
让IE8，ie9兼容 css3 media 媒体查询的js
```html
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
```