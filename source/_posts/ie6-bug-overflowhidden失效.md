---
title: 'IE6 Bug overflow:hidden失效'
tags:
  - 'overflow:hidden'
id: 251
categories:
  - 前端兼容
date: 2015-07-13 14:01:37
---

**bug内容：**
当父元素的直接子元素或者下级子元素的样式拥有position:relative属性时，父元素的overflow:hidden属性就会失效。

**解决方法：**
在父元素中使用position:relative;