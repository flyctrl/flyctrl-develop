---
title: 移动端布局rem通用代码
tags:
  - rem布局
  - 移动端布局
id: 2648
categories:
  - 移动前端
date: 2017-07-14 10:56:31
---

```javascript
<script>
var pixclPatio = 1 / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixclPatio+',minimum-scale='+pixclPatio+',maximum-scale='+pixclPatio+',user-scalable=no" />');

var html = document.getElementsByTagName('html')[0];
var pageWidth = html.getBoundingClientRect().width;
html.style.fontSize = pageWidth / 16 + 'px';
</script>
```

规则：

1、[固定定位]元素内容中有[input]的话，会导致触发键盘之后导致固定定位错位。

2、不管使用背景图还是img，一定要调整对应的size（大小）
如果图片大小和容器大小一致，那么可以使用100%
如果图片大小和容器带下不一样，那么需针对图片分别设置宽/高、x/y

3、碰到文字，一定要测量行高，不然高度会不准确

4、标签的特性需要熟记于心


运算方法：

根目录的fontSize为像素的相对单位rem，本例中，设计稿的宽度为640，那么640/16=40rem