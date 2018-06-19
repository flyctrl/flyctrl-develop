---
title: 'IE6,IE7下设置body{overflow:hidden;}失效'
tags:
  - 'overflow:hidden'
id: 245
categories:
  - 前端兼容
date: 2015-07-13 13:57:32
---

最近做项目发现在IE7下设置body{overflow:hidden;}后还是会出现纵向滚动条，所以上网查查了，在这里记录一下：

设置body{overflow:hidden;}：

IE6 IE7下不生效。IE6下横向纵向滚动条都在，IE7下纵向滚动条还在；

**分析原因：**

chrome、firefox会初始付值给html{overflow:visible;}

IE6 初始付值html{overflow-x:auto;overflow-y:scroll;}

IE7 初始付值html{overflow-x:visible;overflow-y:scroll;}
只有dom根结点（也就是html根节点）设置html{overflow:visible;}的时候，浏览器才会将body元素中的overflow值应用到视图区。

举个例子说：

设置了body{overflow:hidden}，还会出现滚动条，不过这个滚动条不是body的，是html的，只有你设置html{overflow:visible;}body{overflow}的值才能传递到html{}中去。这样html的值就变成了{overflow:hidden}，ok没有滚动条了。这样就很明了啦，并不是bug，而是浏览器初始值不同产生的问题。

所以上面的问题就是通过设置html的overflow的值来解决IE6和IE7下的存在的这个问题；

**总结：**

1.IE6.7下overflow:hidden对其下的绝对层position:absolute或者相对层position:relative无效。

解决方案：给overflow:hidden加position:relative或者position:absolute。另，IE6支持overflow-x或者overflow-y的特性，IE7、Firefox不支持。 

2.IE6.7下，overflow:hidden所在容器必须固定高度，宽度

**最简洁的方法：** 设置html,body{overflow:hidden;}