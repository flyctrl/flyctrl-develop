---
title: '布局神器display:table-cell'
tags:
  - 'display:table-cell'
id: 579
categories:
  - 前端杂货
date: 2015-07-17 13:19:20
---

[![1](http://www.npm8.com/wp-content/uploads/2015/07/1.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/1.jpeg)
## 背景
&emsp;&emsp;随着时间的推进，ie6、ie7在中国浏览器市场的占有率越来越低的情况，我现在工作的团队，经过用户访问数据，得知ie6、ie7的用户已经非常少的前提下，决定不在兼容ie6、ie7。正式在这个激动人心的决定后，让我对display:table-cell；这个属性有了更加深入的应用和理解。在ie8还必须兼容的pc端，它绝对是一个现代的布局神器。

&emsp;&emsp;我并不喜欢用float来做布局，因为它触发的问题比较多，例如要清除浮动，元素浮动后还会导致该元素脱离文档流，即使你清除float，该元素依旧是脱离文档流。

&emsp;&emsp;在需要兼容ie6、ie7的时代我也尽量避免使用float来布局，左右布局能用display:inline-block;布局我就用它来布局，但是还是无法完全不使用它，很多布局例如需要靠左和靠右的布局场景下就没办法不去使用float来布局。我现在切页面很少会去在ie下查看效果，大部分是通过chrome来进行调试的，等整个页面切好了，再用ie过一遍页面，大部分时候页面是没什么太多兼容问题，这或许多年来工作累积的经验使我写代码时避开了一些兼容坑，也可能是自己对盒模型摸索许久以来的一些经验。

&emsp;&emsp;废话不多说，下面直接看demo例子，好可以快速爱上display:inline-block;

## 元素两端对齐

&emsp;&emsp;第一个案例是让两个元素分别向左和向右对齐，如果是过去，我一定会用float来实现，但其实用table可以这么做：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/25-650x171.png)](http://www.npm8.com/wp-content/uploads/2015/07/25.png)

[DEMO1](http://jsfiddle.net/520UED/4b811v3w/ "两元素两端对齐")

## 自动平均划分每个小模块，使其一行显示

第二个案例我们先看看图：

[![3](http://www.npm8.com/wp-content/uploads/2015/07/33-650x203.png)](http://www.npm8.com/wp-content/uploads/2015/07/33.png)

&emsp;&emsp;遇到上面这种布局，一般会用float来做，或者把每个li设置成display:inline-block;来做，并且都要设置给他们设置一个宽度，而且最痛苦的是5个li如果你设置width:20%;他们一定会掉下来，如果li都设置成display:table-cell；就不会出现这种情况，即使不设置宽度他们也会在一行显示，你在加多一行他也不会掉下来，依旧会在一样显示。[**DEMO2**](http://jsfiddle.net/520UED/v9hw6rtj/)

## 图片垂直居中于元素

[![4](http://www.npm8.com/wp-content/uploads/2015/07/44-650x222.png)](http://www.npm8.com/wp-content/uploads/2015/07/44.png)

&emsp;&emsp;有时候我们需要让图片垂直水平都居中于某个元素，用常规写法比较复杂，但用table-cell则相对简单：[**DEMO3**](http://jsfiddle.net/520UED/4x1omd6j/1/ "图片垂直居中于元素")

### 两box实现等高对齐

[![5](http://www.npm8.com/wp-content/uploads/2015/07/53-650x473.png)](http://www.npm8.com/wp-content/uploads/2015/07/53.png)

&emsp;&emsp;上图中的左侧的box的高度始终跟随右侧的box的高度变化而变化：**[DEMO4](http://jsfiddle.net/520UED/w3f1b99p/1/ "两box实现等高对齐")**

&emsp;&emsp;上面的案例我故意不对右侧的box设置display:table-cell，只对左侧，所以就会出现左侧跟随右侧高度变化而变化，如果要实现不管两个box哪个高度产生变化另一个就跟随，只需要把右侧的box也设置成display:table－cell就可以实现了。

## 弹性、响应式布局

&emsp;&emsp;上面的demo中大家只要改变浏览器宽度就会发现他们其实都是会随高度变化自动变化高度的，其实上面内容我大部分没有设置绝对单位，即使设置了也只设置其中一个box另一个就让他去自适应父元素的剩余留下来的宽度，其实布局的时候设置宽度是一件很痛苦的事情，因为除了大量计算有时候可能在多浏览器下还算不准，可能你在chrome设好的宽度在ie下就坑爹了，要写hack才能解决。最后一个案例，据不靠谱的传言faceboox曾经也这么使用过：[**DEMO5**](http://jsfiddle.net/520UED/b32y8n3o/ "弹性、响应式布局")

![liushi](http://www.npm8.com/wp-content/uploads/2015/07/liushi-650x211.gif)

&emsp;&emsp;移动端布局因为有display:box这等属性，所以table-cell相对就排不上什么大用场，不过在移动端你要用table-cell也不是不可以，根据自己对属性的理解去使用就可以了。