---
title: IE、Firefox、Opera和Safari对CSS样式important和*的支持
tags:
  - important
id: 261
categories:
  - 前端兼容
date: 2015-07-13 14:05:45
---

1、IE6、IE7都支持 *，但IE8终于回归正统，放弃了对*的支持

2、IE7、IE8、Firefox、Opera、Safari都支持 important

顾名，important的优先级要高. 举例说明：
```css
body
{
background-color:#FF0000 !important;
*background-color:#00FF00 !important;
*background-color:#0000FF;
background-color:#000000;
}
```
IE6选择最后一个，即：background-color:#000000;（因为IE6对important不感冒）

IE7选择第二个，即：background-color:#000000;（因为IE7开始对important感冒了，同时还死守着它对

感情的最后一版本，但important并未起到优先级的作用）

IE8和Firefox、Opera、Safari选择第一个，即：background-color:#FF0000 !important;（IE8完全感冒于important，同时丢弃了对*的感情）

另外再补充一个，下划线"_",

IE6支持下划线，IE7、IE8和Firefox、Opera、Safari均不支持下划线.