---
title: ie6 下文字和图片一起line-height失效的解决方法
tags:
  - line-height失效
id: 263
categories:
  - 前端兼容
date: 2015-07-13 14:06:28
---

BUG症状：当在一个容器里文字和img、input、textarea、select、object等元素相连的时候，对这个容器设置的line-height数值会失效；

受影响的浏览器：

Microsoft Internet Explorer 5.01 / Windows

Microsoft Internet Explorer 5.5 / Windows

Microsoft Internet Explorer 6

解决方法：

对和文字相连接的img、input、textarea、select、object等元素加以属性

margin: (所属line-height-自身高度)/2px 0;

vertical-align:middle