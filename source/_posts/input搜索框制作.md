---
title: input搜索框制作
tags:
  - input制作
id: 361
categories:
  - 前端杂货
date: 2015-07-13 16:50:27
---

我们需要制作这样一个搜索框：

[![1](http://www.npm8.com/wp-content/uploads/2015/07/19.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/19.jpg)

首先我先抛出制作这个搜索框的细节：

1）文本输入框要有内阴影。

2）文本框与按钮要对齐。

好，我们现在开始制作，先说一下，最直接的制作方法，文本输入框的内阴影我们可以用图片来做，用几像素的图片平铺，然后一个DIV层内包含input与button两个标签，大致HTML标签书写如：  谷歌搜索

这样写虽然实现了想要的效果，但是我们会发现，在IE浏览器下，input与button始终会有1像素的错位，如图：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/23.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/23.jpg)

如果我们要达到满意的效果，就要用到各IE浏览器的hack，造成我们将来维护成本的加大，并且，如果阴影用图片的话，像这样的小图会越来越多，如果用CSS3来实现内阴影，我们的PM肯定会跑来和我们说，你看浏览器的表现不一致，有的有阴影，有的没有，你要是说我们只有高浏览器支持阴影，低版本浏览器不支持阴影，我们的PM会说，我们要的是全浏览器保持一致，坑爹呀，为什么就这么执着呢？不过要求严格，才能使我们进步嘛！

那我们就使用另一个方法来实现，首先，我们的文本框用一个DIV来模拟，然后将input的边框与背景都设置为none，这样就不会出现错位的现象了；接着我们就来处理文本框的内阴影，我们用两个DIV来控制，一般像这样的阴影基本上2像素就能达到效果了，所以我们将X轴的DIV设置上border与下border，Y轴的DIV设置左border与右border，然后定位到用于模拟input的层内，一个完美的input框就制作完成了，阴影CSS代码如下：

```css
.search-field .shadow-x{ position:absolute;top:0;left:1px;width:438px;height:0;border-top:1px solid #d0d0d0;border-bottom:1px solid #f0f0f0;overflow:hidden;z-index:1; }
.search-field .shadow-y{ position:absolute;top:0;left:0;width:0;height:30px;border-left:1px solid #d0d0d0;border-right:1px solid #f0f0f0;overflow:hidden; }
```

阴影HTML代码如下：
```html
<div id="search-field">
<form id="search-form">
<div style="search-input">
<div style="shadow-x"></div>
<div style="shadow-y"></div>
<input type="text" />
</div>
<button type="submit">谷歌搜索</button>
</div>
```
完成后，这个搜索框在视觉上与我们想要的效果一般无二