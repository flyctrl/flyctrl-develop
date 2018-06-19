---
title: CSS纯英文数字自动换行
tags:
  - 自动换行
id: 310
categories:
  - HTML5/CSS3
date: 2015-07-13 15:19:05
---

当一个定义了宽度的块状元素中填充的全部为纯英文或者纯数字的时候，在IE和FF中都会撑大容器，不会自动换行

并且当数字或者英文中带有汉字时，会从汉字处换行，而纯汉字却可以自动换行。这个问题如何解决？先来认识一下两位主角word-wrap和word-break

**word-wrap**

用来控制换行

两种取值：

(1)normal

(2)break-word（此值用来强制换行，内容将在边界内换行，中文没有任何问题，英文语句也没问题。但是对于长串的英文，就不起作用。）


**word-break**

用来控制断词

三种取值：

(1)normal

(2)break-all（是断开单词。在单词到边界时，下个字母自动到下一行。主要解决了长串英文的问题。）

(3)keep-all（是指Chinese, Japanese, and Korean不断词，一句话一行，可以用来排列古诗哟~）

【解决方法】可以在CSS中加入
```css
word-wrap:break-word;
word-break:break-all;
```