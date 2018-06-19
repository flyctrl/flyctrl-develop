---
title: 详解行间距（line-height）计算的背后的真相
tags:
  - line-height
id: 328
categories:
  - HTML5/CSS3
date: 2015-07-13 15:50:50
---

&emsp;&emsp;众所周知的一个垂直居中实现方式(其他的暂不讨论)..

&emsp;&emsp;高度给定的元素, 其内部单行文本垂直居中的一种实现方式为: 给当前定高元素, 设置line-height属性, 其属性值等于当前元素的height值.

&emsp;&emsp;今天了解到了一条相关知识, 明白这个方法的实现原理.
我们常说的单倍行距, 双倍行距等等, 主观上认为是line-height设置的值, 如果量一下实际的效果, 会发现, 两行文本的间距, 并非等于line-height的值.

[![1](http://www.npm8.com/wp-content/uploads/2015/07/13.png)](http://www.npm8.com/wp-content/uploads/2015/07/13.png)

**浏览器计算和分配行间距的方法**

间距 = "line-height" – "font-size";

文本上下分配大小 = 间距/2;

字号 = 12px; line-height:3;

间距 = 3*12 – 12 = 24(px);

文本上下分配大小 = 24/2 = 12(px)

逻辑上如此无懈可击~ o.0

**小知识点(个人认为, 应该这样)****

&emsp;&emsp;line-height的值, 推荐使用数字而非带有单位的值, 如, 推荐使用line-height:2; 不推荐使用line-height:24px;原因在于, line-height:24px;是一个固定的值, 对于任何大小的文本, 都采用这个值来计算行间距. 若文本的字号过大, 会出现重叠的问题. 不带单位的值表示倍数. 自然避免了该问题.

**看下边的例子**

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style type="text/css">
div {
font-size: 30px;
font-family: Consolas, Microsoft Yahei, SimSun;
margin: 10px 10px 0px 10px;
padding: 10px;
}
#demo_1 {
background: #EEE;
border: solid 1px #CCC;
line-height: 12px;
}
#demo_2 {
background: #333;
border: solid 1px #000;
line-height: 2;
color: #FFF;
}
</style>
<title>Line-heighg demo</title>
</head>

<body>
<div id="demo_1"> line-height:24px;
line-height:24px; </div>
<div id="demo_2"> line-height:2;
line-height:2; </div>
</body>
</html>
```