---
title: IE浏览器下去掉链接等的虚边框
tags:
  - ie虚边框
  - ie链接
id: 332
categories:
  - 前端杂货
date: 2015-07-13 15:51:58
---

浏览器兼容性bug：

在ff下,a链接没有虚边框,而在ie浏览器里当我们的鼠标点击链接的时候却发现a链接有虚边框，后来我试了下a:visited{border:1px solid red}都不行,当我点击链接的时候,a链接还是有虚线边框,

后来发现这样可以：
```css
a{
border:1px solid red;
*blr:expression(this.onFocus=this.blur());
outline:none;
}
```