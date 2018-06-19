---
title: CSS实现两端对齐
tags:
  - css实现两端对齐
id: 1695
categories:
  - HTML5/CSS3
date: 2015-09-18 17:48:27
---

**方法一：使用text-align:justify**

text-align:justify

属性是全兼容的，使用它实现两端对齐，需要注意在模块之间添加[空格/换行符/制表符]才能起作用，同样，实现文本对齐也是需要在字与字之间添加[空格/换行符/制表符]才能起作用

说明：

1.IE中要实现块内单行两端对齐需要使用其私有属性text-align-last:justify配合，text-align-last 要生效，必须先定义text-align 为justify

2.line-height:0 解决标准浏览器容器底部多余的空白
```css
.content{

     text-align:justify;

     text-align-last:justify;

     line-height:0;

     height:44px;

}
```
说明：

模块使用[换行符]或[空格符]后，webkit浏览器中会引起最后一个模块有多余空白，使用font-size:0可清除该空格
```css
@media all and (-webkit-min-device-pixel-ratio:0){

.content{

     font-size:0;

}

}
```
说明：

1.text-align-last:justify 目前只有IE支持，标准浏览器需要使用 .demo:after 伪类模拟类似效果

2.opera浏览器需要添加 vertical-align:top 才能完全解决底部多余的空白
```css
.content:after{

     display:inline-block;

     overflow:hidden;

     width:100%;

     height:0;

     content:'';

     vertical-align:top;

}
```
且子类必须是 inline-block 元素

********************************************************************************

**方法二：使用box-pack:justify**

父类容器css:
```css
.content{

    display:-webkit-box;

    display:-webkit-flex;

    display:-ms-flexbox;

    display:flex;

    -webkit-box-pack:justify;

    -webkit-justify-content:space-between;

    -ms-flex-pack:justify;

    justify-content:space-between;

}
```
且子类必须是 block 元素

********************************************************************************

**方法三：使用column(多列布局)**

说明：

1.column-count定义了对象的列数

2.column-gap定义了对象中列与列的间距

父类容器css:
```css
.content {

    -webkit-column-count: 2;

    -moz-column-count: 4;

    column-count: 4;

    -webkit-column-gap: 20px;

    -moz-column-gap: 20px;

    column-gap: 20px;

}
```
且子类必须是 block 元素