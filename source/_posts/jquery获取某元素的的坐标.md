---
title: JQuery获取某元素的的坐标
tags:
  - 获取坐标
id: 291
categories:
  - JS/Jq
date: 2015-07-13 15:01:49
---

获取页面某一元素的绝对X,Y坐标，可以用offset()方法：（body属性设置margin :0;padding:0;）

**var X = $('#DivID').offset().top;**

**var Y = $('#DivID').offset().left;**

//获取相对(父元素)位置:

**var X = $('#DivID').position().top;**

**var Y = $('#DivID').position().left;**

比如我下面做的这个效果，按个小三角行跟着按钮点击的位置就是需要用到获取坐标值的方法。

[![1](http://www.npm8.com/wp-content/uploads/2015/07/16.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/16.jpg)

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>java Test</title>
</head>
<style type="text/css">
<!--
body,div { margin:0; padding:0;}
-->
</style>
<script type="text/javascript" src="js/jquery.js"></script>

<body>
<div style="background:#ccc;height:300px;" onclick=""></div>
<div style="position:relative;">
<div style=" position:absolute;left:50px; top:50px;" id="DivID"></div>
</div>
<script type="text/javascript">
var X = $('#DivID').offset().top;
var Y = $('#DivID').offset().left;
document.write(X+"
");
document.write(Y+"
");
//获取相对(父元素)位置:
var C = $('#DivID').position().top;
var D = $('#DivID').position().left;
document.write(C+"
");
document.write(D);
</script>
</body>
</html>
```