---
title: 'position: fixed 的跨浏览器完美解决方案(支持IE5、6且无抖动)'
tags:
  - 'position:fixed'
id: 59
categories:
  - 前端兼容
date: 2015-07-11 16:11:37
---

position: fixed;这个属性用起来确实很方便，可以轻松的实现固定位置的浮动层效果。但是，它不支持IE6及以下版本。于是很多同学使用JS模拟。今天写了一个DEMO，涉及左侧、右侧。及上下两边，共四种位置的固定，与以往的教程不同的地方是，它使用CSS表达式来兼容IE5、IE6，且避免了js模拟时，拖动滚动条时出现抖动的问题，另外在IE5或者怪癖模式下也完全正常，没有任何问题。如果你有更好的方案，欢迎来喷我。
下面是代码

```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>position: fixed</title>
<style type="text/css">
* {
padding: 0;
margin: 0;
}
#content {
height: 5000px;
width: 50%;
border-right: 10px dotted red;
}
#demo_t, #demo_b, #demo_l, #demo_r {
background: #f90;
position: fixed;
}
#demo_t, #demo_b {
left: 0;
width: 100%;
}
#demo_l, #demo_r {
width: 50px;
top: 300px;
}
#demo_t {
top: 0;
}
#demo_b {
bottom: 0;
}
#demo_l {
left: 0;
}
#demo_r {
right: 0;
}
</style>
<!--[if lte IE 6]>
<style type="text/css">
html {
/*这个可以让IE6下滚动时无抖动*/
background: url(about:black) no-repeat fixed
}
#demo_t, #demo_b, #demo_l, #demo_r {
position: absolute;
}
#demo_t, #demo_b {
/*这个解决body有padding时，IE6下100%不能铺满的问题*/
width: expression(offsetParent.clientWidth);
}

/*下面三组规则用于IE6下top计算*/
#demo_l, #demo_r {
top: expression(offsetParent.scrollTop + 300);
}
#demo_t {
top: expression(offsetParent.scrollTop);
}
#demo_b {
top: expression(offsetParent.scrollTop + offsetParent.clientHeight-offsetHeight);
}
</style>
<![endif]-->
</head>

<body>
<div id="demo_t">此处显示 id "demo" 的内容</div>
<div id="demo_b">此处显示 id "demo" 的内容</div>
<div id="demo_l">此处显示 id "demo" 的内容</div>
<div id="demo_r">此处显示 id "demo" 的内容</div>
<div id="content"></div>
</body>
</html>
```

建议在实际使用时，将IE条件注释中的代码放在单独的css文件中，以便节约其他浏览器的流量。
