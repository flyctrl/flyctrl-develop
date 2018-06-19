---
title: CSS定义input disabled样式
tags:
  - CSS定义input disabled样式
id: 2087
categories:
  - HTML5/CSS3
date: 2016-01-14 00:14:19
---

disabled 属性规定应该禁用 input 元素。
被禁用的 input 元素既不可用，也不可点击。可以设置 disabled 属性，直到满足某些其他的条件为止（比如选择了一个复选框等等）。然后，就需要通过 JavaScript 来删除 disabled 值，将 input 元素的值切换为可用。
以下三种写法都可以禁用 input
```html
<p><inputtype="text"disabledvalue="已禁用"/></p>
<p><inputtype="text"disabled="disabled"value="已禁用"/></p>
<p><inputtype="text"disabled=disabledvalue="已禁用"/></p>
```
被禁用的 input 默认显示灰色，可以通过CSS修改样式。


**1\. 利用CSS3 :disabled 伪元素定义**
```css
//Chrome Firefox Opera Safari
input:disabled{
border:1px solid #DDD;
background-color:#F5F5F5;
color:#ACA899;
}
```
**2\. 利用属性选择符定义**
```css
//IE6 failed
input[disabled]{
border:1px solid #DDD;
background-color:#F5F5F5;
color:#ACA899;
}
```
**3\. 利用类来定义**
```css
input.disabled{
border:1px solid #DDD;
background-color:#F5F5F5;
color:#ACA899;
}
```
**最终结果：**
```css
input[disabled],input:disabled{
border:1px solid #DDD;
background-color:#F5F5F5;
color:#ACA899;
}
//IE6 Using Javascript to add CSS class "disabled"
* html input.disabled{
border:1px solid #DDD;
background-color:#F5F5F5;
color:#ACA899;
}
```
**注意：**IE8 bug 由于IE8 不识别 :disabled 导致input[disabled],input:disabled样式失效，可以考虑单独来写，或者直接使用input[disabled]。
