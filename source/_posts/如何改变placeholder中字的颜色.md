---
title: 如何改变placeholder中字的颜色
tags:
  - 改变placeholder字的颜色
id: 1017
categories:
  - HTML5/CSS3
date: 2015-07-26 17:09:32
---

&emsp;&emsp;placeholder属性是css3中新增加的属性，IE9和Opera12以下版本的CSS选择器均不支持占位文本.
因为每个浏览器的CSS选择器都有所差异，所以需要针对每个浏览器做单独的设定(可以在冒号前面写input和textarea)。
```css
::-webkit-input-placeholder { /* WebKit browsers */
　　color:#999;
　　}

　　:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
　　color:#999;
　　}

　　::-moz-placeholder { /* Mozilla Firefox 19+ */
　　color:#999;
　　}

　　:-ms-input-placeholder { /* Internet Explorer 10+ */
　　color:#999;
　　}
```
还可以写成下面这样：
```css
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
　　color: #666;
　　}

　　input:-moz-placeholder, textarea:-moz-placeholder {
　　color:#666;
　　}

　　input::-moz-placeholder, textarea::-moz-placeholder {
　　color:#666;
　　}

　　input:-ms-input-placeholder, textarea:-ms-input-placeholder {
　　color:#666;
　　}
```
**知识点：**

单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。

css伪类：CSS 伪类用于向某些选择器添加特殊的效果。

css伪元素：CSS 伪元素用于向某些选择器设置特殊效果。

伪元素由双冒号和伪元素名称组成。双冒号是在当前规范中引入的，用于区分伪类和伪元素。但是伪类兼容现存样式，浏览器需要同时支持旧的伪类，

如:first-line,:first-letter,:before,:after等等。因此对于css2之前已经有的伪元素两种写法的作用是一样的，但是为了兼容IE浏览器还是使用单冒号的写法。