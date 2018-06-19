---
title: RGBA与Opacity区别详解
tags:
  - RGBA与Opacity区别
id: 1402
categories:
  - HTML5/CSS3
date: 2015-08-29 16:11:05
---

RGBA和Opacity都和透明度有关，但是它们又有什么区别呢？也许有的小伙伴一时也想不出来，不要紧，悄悄地往下看。

先来简单看看RGBA：

**语法**
```cssr
gba(r,g,b,a)
```
**取值说明**

R：红色值。正整数 | 百分数

G：绿色值。正整数 | 百分数

B：蓝色值。正整数 | 百分数

A：Alpha透明度。取值0~1之间。

正整数为十进制0~255之间的任意值，百分数为0%~100%之间的任意值。

RGBA是在R（Red）G（Green）B（Blue）模式上增加了alpha通道，alpha通道是**不透明度**，即，如果一个元素的alpha通道数值为0%（或0），那该元素就是**完全透明**的（也就是看不见的，但是可以透过该元素看到该元素下的元素），数值为100%（或255）时则意味着该元素完全**不透明**。

再来看看Opacity：

**语法**
```css
opacity: value|inherit;
```

**取值说明**

value:**不透明度**，从 0.0 （**完全透明**）到 1.0（完全**不透明**）。

_Tip：IE8 以及更早的版本支持替代的 filter 属性。例如：filter:Alpha(opacity=50)。_

RGBA和opacity都是用来设置元素的不透明度的，那么两者有什么区别呢？

**区别**

**opacity会继承父元素的 opacity 属性，而RGBA设置的元素的后代元素不会继承不透明属性。**两者的区别可以直接看下面的实现和贴图效果：

![042254597421322](http://www.npm8.com/wp-content/uploads/2015/08/042254597421322.png)

从图上可以看到，给div设置Opacity属性的里面的文本也是半透明的，而给div设置RGBA属性的里面的文本并没有继承透明性。

**注：该实例RGBA和Opacity的不透明度取值均为0.5.**

所以RGBA相对于Opacity还是技高一筹的。当然，只要是涉及到颜色的都可以用RGBA来设置，比如上面用到的background-color、text-shadow、box-shadow。