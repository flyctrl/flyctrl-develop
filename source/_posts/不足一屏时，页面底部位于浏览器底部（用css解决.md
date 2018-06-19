---
title: 不足一屏时，页面底部位于浏览器底部（用CSS解决）
id: 178
categories:
  - HTML5/CSS3
date: 2015-07-12 21:33:07
tags:
---

写一些系统后台的页面时，时长用需要做到 “不足一屏时，页面底部位于浏览器底部”；在网上看了很多办法，有些兼容性不好，有些需要用到JS ，最后找到这个办法纯CSS的觉得非常不错，随后自己完善了下。将代码贴出来与大家一起探讨！

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>不足一屏时，页面底部位于浏览器底部</title>
<style type="text/css">
*{margin:0; padding:0;}
html,body{height:100%;}
.wrap{position:relative;min-height:100%;}
.header{height:50px;background-color:#6CF;}
.content{padding-bottom:50px;/*height:2000px; 做超过一屏时使用*/}
.footer{
position:absolute;bottom:0;left:0;
width:100%;/*绝对定位使后宽度100%*/height:50px;
background-color:green;
}
</style>
</head>

<body>
<div class="wrap">
<div class="header">header</div>
<div class="content"></div>
<div class="footer">footer</div>
</div>

</body>
</html>
```