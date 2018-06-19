---
title: jQuery中的ready与onload的区别
tags:
  - onload
  - ready
id: 298
categories:
  - JS/Jq
date: 2015-07-13 15:06:18
---

Jquery中的$(document).ready()(也可简写为$().ready())方法与javascirpt本身提供的window.onload() 都可以在DOM载入就绪时操作并调用执行它所绑定的函数。
在实际使用中它们还是存在细微的区别的，window.onload()方法是在网页上所有的元素（包括元素的所有关联文件）完全加载到浏览器后才执行，即javascript此时才可以访问网页上的所有元素。

而通过jquery中的$().ready()方法注册的事件处理程序，在DOM完全就绪的时候就可以被调用。此时网页上的所有元素都是可以被访问的，但是，这并不意味着网页上所有元素关联的文件都已经下载完毕！

通过这样细微的差别可以看出jquery提供的$().ready()可以很好的提高web相应效率。

但有时也存在一些弊端，比如在HTML文件中嵌入一个SVG文件，这样你无法在$().ready()中访问SVG文件中的元素，因为SVG文件在DOM加载完成时可能还没有被下载下来，s这样只
能用Jquery提供的$(window).load()方法代替，$(window).load()与window.onload()是同样的效果！