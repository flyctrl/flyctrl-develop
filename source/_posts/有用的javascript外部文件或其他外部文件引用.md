---
title: 有用的javascript外部文件或其他外部文件引用
tags:
  - javascript外部文件的引用
id: 1766
categories:
  - JS/Jq
date: 2015-09-22 23:26:45
---

1、
```html
<link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet' type='text/css' /><!--引入谷歌字体API-->
```

2、
```html
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js"></script><!--引入谷歌的外部jquery文件-->
```

3、引入外部js文件，html5标签，让它们在IE6\7\8可以成为标签

当IE的等版本浏览器不支持html5标签时，这个外部别人已经写好的js文件，只要引入进来，就可以很好的解决这个问题。

不用再自己一个个的createElement地去创建标签了

```html
<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

**使用Modernizr**，Modernizr会自动替你解决上述问题，不用使用html5.js或者样式规则。

1、打开www.modernizr.com，找到 Download Modernizr 区域，单击其中的Development按钮，下载Modernizr的js文件。

2、把下载到的js文件放到你的网页所在文件夹，例如js文件夹。

3、在页面```<head>```区块中添加对这个js文件的引用。

示例：
```html
<head>
<meta charset="utf-8">
<title>Html5</title>
<!--[if lt IE 9]>
<script src="/skin/blog/js/modernizr.js"></script>
<![endif]-->
...
</head>
```