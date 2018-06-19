---
title: inline-block + justify实现列表两端对齐
tags:
  - inline-block，justify
id: 426
categories:
  - 前端杂货
date: 2015-07-15 10:22:51
---

适用条件：

1、一行的li间距宽度 小于两个li的宽度之和；

2、li个数刚好满行

条件1大部分都能满足的，所以主要就是刚好满行的情况。

相关代码片段

Css代码
```css
ul {
    text-align:justify;
    text-justify:distribute;
    font-size:0;
    letter-spacing:-4px;/*解决inline-block间隙表现不一致 bug*/
}
ul li {
    display:inline-block;
    *display:inline;
    *zoom:1;
    font-size:12px;
    letter-spacing:0;
    vertical-align:top;
}
ul li.justify_fix {
    width:100%;
    height:0;
    line-height:0;
    font-size:0;
    overflow:hidden;
    margin:0;
    padding:0;
}
```
html结构如下
```html
<div class="container">
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
<!--  必须空出一个li 来fix bug -->
<li class="justify_fix"></li>
</ul>
</div>
```