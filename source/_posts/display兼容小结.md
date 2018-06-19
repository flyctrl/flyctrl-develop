---
title: display兼容小结
tags:
  - display兼容
id: 221
categories:
  - 前端兼容
date: 2015-07-13 13:30:58
---

display:block 此元素将显示为块级元素，此元素前后会带有换行符。

display:table 此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符

使用发现以上两个的区别是，如果元素同时定义边框可以看出，block时元素宽度是100% 而table时宽度仅为内容所占宽度。【除了ie7ie6定义为table也都是占100%宽度外】

display:inline-block 行内块元素，可以使元素并排显示。

注意是对****块级元素****使用后所有浏览器下，两元素之间会多产生6px的间隔。

而有IE6 IE7下些方法无法使元素并排，解决办法是： display:inline-block;*zoom:1;*display:inline;[这样不会产生6PX间隔， *仅ie6ie7可识别 注意书写顺序]

而对****内联元素****使用了inline-block，那所有的浏览器显示都是正常的。【可以使得内联元素定义的宽度有效并且仍然并排显示 / 如果用display:block使内联元素定义的宽度有效果则会产生换行。】

（ie6、ie7中对内联元素使用display:inline-block，IE是不识别的，但使用display:inline-block在IE下会触发layout，从而使内联元素拥有了display:inline-block属性的表征。）