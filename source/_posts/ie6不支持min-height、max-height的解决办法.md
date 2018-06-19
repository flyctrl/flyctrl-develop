---
title: IE6不支持min-height、max-height的解决办法
tags:
  - ie6
  - max-height
  - min-height
id: 334
categories:
  - 前端兼容
date: 2015-07-13 15:53:56
---

**第一种解决方法**：
我们可以利用IE6不识别!important来实现：
```css
height:auto!important;
height:500px;
min-height:500px;
```
这3句代码就让IE6也有了高度min-height的效果，大家可以把下面的代码复制保存成网页文件看看效果。
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>残缺 完美 生活</title>
</head>
<style type="text/css">
* {
margin:0;
padding:0;
}
body {
font-family:Arial, Helvetica, 宋体, sans-serif;
font-size:12px;
text-align:center;
background-color:#D4D5CC;
}
#wrapper {
height:auto!important;
height:500px;
min-height:500px;
width:760px;
background-color:#e5e5e5;
border:1px solid #fff;
text-align:left;
line-height:150%;
padding:20px;
margin:10px auto;
}
</style>
<body>
<div id="wrapper"> The Furthest Distance In The World <br />
世界上最遥远的距离 <br />
Tagore泰戈尔 <br />
The furthest distance in the world <br />
世界上最遥远的距离 <br />
Is not between life and death <br />
不是生与死 <br />
But when I stand in front of you <br />
而是 我就站在你面前 <br />
Yet you don't know that I love you <br />
你却不知道我爱你 <br />
</div>
</body>
</html>
```
**第二种解决方法：**
在IE6IE5IE7FF测试竟然正常，而且能通过W3C检测的,方法如下:
HTML代码

#test { min-height:100px; background:#BBB; _height:100px; overflow: visible; }
说明一下上面这段CSS的意思。

min-height:100px;这一句在ie7和FF已经可以正常显示了。。

_height:100px这一句在ie6，ie5测试显示正常。但不能过W3C验证:

overflow:visible;这一句为了注明#test当内容超过100px时就自动延长。

注意：你必须保证#test以外的都要是overflow:visible。否则还是不会显示超出。

**第三种解决方法：**

IE6有许多bug，之一是不支持min-这个属性。是做UI设计时，全屏展示，但是当窗口不在最大化时，缩小到一定大小，图片会严重错位，影响页面排版，这时要设置一个最小宽度，其他浏览器都支持min-width这个属性，未读IE6不支持，以下是第三种解决方案。

**1、IE6支持max-height解决方法**

```css
.yangshi{max-height:1000px;_height:expression((document.documentElement.clientHeight||document.body.clientHeight)<1000?"1000px":"");overflow:hidden;}
```

**2、IE6支持min-height解决方法**

```css
.yangshi{min-height:1000px;_height:expression((document.documentElement.clientHeight||document.body.clientHeight)>1000?"1000px":"");}
```

**3、IE6支持max-height又支持min-height方法**
```css
.yangshi{Max-Height:620px;Min-Height:40px;_height:expression(this.scrollHeight > 620 ? "620px" : (this.scrollHeight < 40 ? "40px" : "auto"));}
```

上面是最简单的方式，可能会增加服务器的负担，网上还有其他方式，可查阅借鉴一下。