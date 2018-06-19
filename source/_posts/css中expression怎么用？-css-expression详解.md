---
title: CSS中expression怎么用？ CSS expression详解
tags:
  - expression
id: 340
categories:
  - HTML5/CSS3
date: 2015-07-13 16:25:43
---

**什么是CSS expression？**

IE5及其以后版本支持在CSS中使用expression，用来把CSS属性和Javascript脚本关联起来，这里的CSS属性可以是元素固有的属性，也可以是自定义属性。就是说CSS属性后面可以是一段Javascript表达式，CSS属性的值等于Javascript表达式计算的结果。 在表达式中可以直接引用元素自身的属性和方法，也可以使用其他浏览器对象。这个表达式就好像是在这个元素的一个成员函数中一样。 是不是感觉上面的文字有点晦涩？没有关系，你只需要知道：我们可以通过expression把Javascript脚本写放在css文件中，通过它来实现一些很方便的功能与效果。

**1、给元素固有属性赋值**

下面的实例是依照浏览器的大小来安置一个元素的位置。查看运行效果试试。
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "[<span style="color: #0066cc;">[url]http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd</span>](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)[/url]">
<html xmlns="[<span style="color: #0066cc;">[url]http://www.w3.org/1999/xhtml</span>](http://www.w3.org/1999/xhtml)[/url]">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>[www.52css.com</title>](http://www.52css.com%3C/title%3E)
<style type="text/css">
<!--
#myDiv {
position: absolute;
width: 100px;
height: 100px;
background:#c00;
left: expression(document.body.offsetWidth - 180 + "px");
top: expression(document.body.offsetHeight - -80 + "px");
text-align:center;
line-height:90px;
color:#fff;
}
-->
</style>
</head>
<body>
<div id="myDiv">52css.com</div>
</body>
</html>
```
**2、给元素自定义属性赋值**

我们想给页面的链接消除点击时产生的虚线。
在一般情况下，我们是这样做的：
```html
<a href="link1.htm">52css.com</a><br />
<a href="link2.htm">52css.com</a><br />
<a href="link3.htm">52css.com</a>
```
采用expression的做法如下：
a {star:expression=\'#\'"}
我们看下面的例子：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "[<span style="color: #0066cc;">[url]http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd</span>](http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)[/url]">
<html xmlns="[<span style="color: #0066cc;">[url]http://www.w3.org/1999/xhtml</span>](http://www.w3.org/1999/xhtml)[/url]">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>[www.npm8.com](http://www.npm8.com)</title>
<style type="text/css">
<!--
a {star:expression=\'#\'"  />-->
</style>
</head>
<body>
<a href="#">grycheng- [<span style="color: #0066cc;">www.npm8.com</span>](http://www.npm8.com)<span style="color: #000000;"></a></span>
</p>
</body>
</html>
```
说明：里面的star就是自己任意定义的属性，你可以随自己喜好另外定义，接着包含在expression()里的语句就是JS脚本，在自定义属性与expression之间可别忘了还有一个引号，因为实质还是CSS，所以放在style标签内，而非script内。这样就很容易地用一句话实现了页面中的链接虚线框的消除。

**需要引起你特别重视的：若不是非常特别的需要用到expression，一般不建议使用expression，因为expression对浏览器资源要求比较高。**