---
title: 'IE6不支持border-color:transparent 的问题解决'
tags:
  - transparent
id: 115
categories:
  - 前端兼容
date: 2015-07-12 01:35:06
---

IE6不支持设置transparent为边框的颜色。

例如：
border:solid 1px transparent;

[![c](http://www.npm8.com/wp-content/uploads/2015/07/c-190x300.gif)](http://www.npm8.com/wp-content/uploads/2015/07/c.gif)

解决方法：

border:solid 1px transparent;

_border-color:tomato;

_filter:chroma(color=tomato);

(说明:　Chroma属性可以设置一个对象中指定的颜色为透明色，它的表达式如下：

Filter：Chroma（color=color）
这个属性的表达式是不是很简单，它只有一个参数。只需把您想要指定透明的颜色用Color参数设置出来就可以了。)

结果如下：

[![d](http://www.npm8.com/wp-content/uploads/2015/07/d-300x237.gif)](http://www.npm8.com/wp-content/uploads/2015/07/d.gif)

边框是没了，可字体怎么。。。
主意，以上现象是只有在打开系统的ClearType时才会看到的，如果把ClearType关掉就没问题了，见下

[![e](http://www.npm8.com/wp-content/uploads/2015/07/e-300x237.gif)](http://www.npm8.com/wp-content/uploads/2015/07/e.gif)

解决方法：

border:solid 1px transparent;
background-color:#BFDBFF;

_border-color:tomato;

_filter:chroma(color=tomato);

[![f](http://www.npm8.com/wp-content/uploads/2015/07/f-172x300.gif)](http://www.npm8.com/wp-content/uploads/2015/07/f.gif)