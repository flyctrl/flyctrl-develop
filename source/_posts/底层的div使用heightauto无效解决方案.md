---
title: '底层的DIV使用height:auto无效解决方案'
tags:
  - 'height:auto无效'
id: 352
categories:
  - HTML5/CSS3
date: 2015-07-13 16:35:02
---

```html
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>

#main_center{
margin:8px 8px auto 8px;
height:auto;
background:#093;}
.main_center_left{
width:160px;
float:left;
background:#333;
height:400px;
margin-right:10px;}
.main_center_right{
width:783px;
float:right;
background:#906;
height:400px;}
.main_center_right_side{
width:200px;
float:right;
background:blue;
height:400px;}
.center_news{
width:573px;
margin-right:10px;
float:left;
height:400px;
background:#666;}
</style>
</head>

<body>
<div id="main_center">
<div class="main_center_left">160width</div>
<div class="main_center_right">
<div class="center_news">
</div>
<div class="main_center_right_side">200width</div>
</div>
</div>
</div>
</body>
</html>
```

&emsp;&emsp;此时height:auto;和height:400px;是无效的，div不会显示高度。这是浮动导致的

**第一种方法**，可以直接清除页面的浮动，代码量不多的时候很容易发现哪里没有清除浮动（亲们使用了浮动的时候一定要记得清除浮动哦，否则可能将会有很多类似的怪异问题出现！）。

**第二种方法**，跟第一种方法有异曲同工之处，height:auto;(height:400px;)可以换成zoom:1;overflow:hidden;
zoom:1会触发ie（ie8以下）的haslayout，刚好能清理浮动。
另外，height:400px;同zoom:1;一样会触发ie（ie8以下）的haslayout，但auto值却不会。