---
title: CSS3文字描边 CSS3字体外部描边
tags:
  - CSS3文字描边
id: 1837
categories:
  - HTML5/CSS3
date: 2015-10-14 13:45:32
---

给需要实现文字描边的元素添加如下CSS3的属性
```css
text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;

-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;

-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;

*filter: Glow(color=#000, strength=1);
```

![css3](http://www.npm8.com/wp-content/uploads/2015/10/57.png)

语法详解：

text-shadow:向文本设置阴影。

text-shadow:color||length||length||opacity。

color:指定颜色。

length:第一个length指定阴影在水平方向上的延伸距离，第二个length指定阴影在垂直方向上的延伸距离，可以为负值。

opacity:指定阴影模糊效果的作用距离。

用逗号分隔的4个属性值代表的方向顺序为右下左上。

为了兼容多浏览器而加上前缀-webkit-和-moz-。

&nbsp;

filter:滤镜。

filter:Glow 添加光辉晕圈效果在元素对象的边外。

filter:Glow（color=颜色值，strength=数值）。

color:指定晕圈发光效果的颜色。

strength:指定晕圈发光的强度范围，参数值从1到255。