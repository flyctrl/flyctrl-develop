---
title: 各浏览器input输入框中的光标高度显示不一致
tags:
  - input高度
id: 249
categories:
  - 前端兼容
date: 2015-07-13 14:00:49
---

&emsp;&emsp;input输入框用一个背景图模拟，设置height和line-height一样的高度，使里面的输入文字能够居中， 

&emsp;&emsp;在FF下出现的情况是：点击input时，输入光标其实上跟input的height一样高，但当开始输入文字时，光标又变得跟文字一样高， chrome下光标跟input的height一样高， 而IE下光标跟文字的大小一致。 一直没弄明白为什么这样子，今天经过团队讨论，才知道原因所在。 

&emsp;&emsp;初步结论如下：

IE：不管该行有没有文字，光标高度与font-size一致。

FF：该行有文字时，光标高度与font-size一致。该行无文字时，光标高度与input的height一致。

Chrome：该行无文字时，光标高度与line-height一致；该行有文字时，光标高度从input顶部到文字底部(这两种情况都是在有设定line-height的时候)，如果没有line-height，则是与font-size一致。 解决的方案： 给input的height设定一个较小的高度，然后用padding去填充，基本上可以解决所有浏览器的问题
```css
input{
height: 16px;
padding: 4px 0px;
font-size: 12px;
}
```