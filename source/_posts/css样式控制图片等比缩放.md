---
title: CSS样式控制图片等比缩放
tags:
  - css3
  - 等比例缩放
id: 12
categories:
  - HTML5/CSS3
date: 2015-07-10 15:30:11
---

&emsp;&emsp;例如，某容器宽度为950px，内容图片宽高不等，有可能是1000px宽度。为了方便编辑，不用对每张内容图片处理尺寸。
图片样式为：
```css
img{ max-width:950px; height:auto}
```
但是ie6不识别max-width样式，所以只能对这个强加HACK: _width:950px;
若是省略：height:auto，图片只会缩小宽度，做不到等比缩放。

当然，有了伟大的CSS3，这个问题就很容易解决了。

**scale([, ])：指定对象的2D**

scale（2D缩放）

第一个参数对应X轴，

第二个参数对应Y轴。如果第二个参数未提供，则默认取第一个参数的值

scaleX()：指定对象X轴的（水平方向）缩放

scaleY()：指定对象Y轴的（垂直方向）缩放

**e.g. transform:scale(1.2)**

注意，目前需加私有前缀。只可惜只能控制倍数，不可以设值具体数值即：length.