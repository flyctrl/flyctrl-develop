---
title: CSS3移入图片放大效果
tags:
  - CSS3移入图片放大
id: 1207
categories:
  - HTML5/CSS3
date: 2015-08-08 18:19:37
---

我们有时看到一些网站有的照片，当我们将鼠标移入的时候，会有个放大的动画效果，今天我就来讲讲这个效果是如何实现的。

**HTML的基本结构**
我们需要一个 pic 来作为 3D 场景，里面有一个 img 标签作为图片的容器。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>放大镜效果</title>
<style>

</style>
</head>
<body>
<div id="pic">
<img src="img/pic.jpg">
</div>
</body>
</html>
```
**#pic 的基本 CSS**

设定高、宽、居中效果、背景颜色（实际上图片会覆盖掉），同时超出部分hidden。
```css
#pic{
height:480px;
width:480px;
margin:0 auto;
background-color: #ccc;
overflow: hidden;
}
```
**设置 img 的初始样式**

由于要保证放大后的清晰度，所以往往做这个效果的照片在鼠标未移入前会缩小显示，而hover后才恢复正常比例。
我使用的照片是 960px × 960px 的，初始时设置照片缩小到原来的 0.5 倍（这也是为什么上面的#pic我设置高和宽都为480px）。
图片默认是中心放大/缩小的，所以初始化时我们缩小到 0.5 倍时图片四周会有一定的“空隙”，我们可以使用 margin 的方法来解决这个问题。
```css
#pic img{
margin:-240px 0 0 -240px;
-webkit-transform: scale(.5); /* 默认显示 0.5 倍的照片 */
}
```
为了有渐渐放大的动画效果，可以使用 transition 属性：
```css-webkit-transition: 1s;```
**设置 img 的移入效果**
通过 :hover 这个伪类来改变 transform 属性以实现放大效果。
```css
#pic img:hover{
-webkit-transform: scale(.6);
}
```
**所有代码**
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>放大镜效果</title>
<style>
#pic{
height:480px;
width:480px;
margin:0 auto;
background-color: #ccc;
overflow: hidden;
}
#pic img{
margin:-240px 0 0 -240px;
-webkit-transform: scale(.5);
-webkit-transition: 1s;}
#pic img:hover{
-webkit-transform: scale(.6);
}
</style>
</head>
<body>
<div id="pic">
<img src="img/pic.jpg">
</div>
</body>
</html>
```
**Ps :** demo 以 Webkit 为例，其它浏览器内核请自行加上如 -moz- 等前缀。

[查看演示](http://demo.grycheng.com/case/css3bigpic/)