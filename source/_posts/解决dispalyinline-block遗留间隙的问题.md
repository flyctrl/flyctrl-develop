---
title: '解决dispaly:inline-block遗留间隙的问题'
tags:
  - 'dispaly:inline-block 间隙'
id: 1658
categories:
  - 前端兼容
date: 2015-09-16 12:57:40
---

&emsp;&emsp;今天做一个项目 。本来我打算是作成表格的 ，后来觉得太费事直接搞成一个div 里面直接放四个a ，然后我将a 设置成inline-block。刚开始还没发现任何间隙问题，(对了说到这里 博主给新手介绍一个方法 如果对div 布局 或者大小 等有问题的 不妨设置一下他的背景色，)回归主题这时候我给a设置一个border-bottom  问题来了 出现间隙了

![111](http://www.npm8.com/wp-content/uploads/2015/09/111.png)
我仅是设置a的display值

处理的方法 

空隙是有标签之间的空隙造成的所以可以

1）将a标签分开写
![222](http://www.npm8.com/wp-content/uploads/2015/09/222.png)

2）
inline-block的父元素设置font-size等于0，在inline-block的font-size设置为正常值，也是可以的

3）如果需要设置字体的元素比较多，一般也可以用margin负值解决的

4）还有wordspacing letterspacing 等等好多方法
&nbsp;