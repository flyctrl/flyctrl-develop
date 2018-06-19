---
title: 'CSS3技术:雪碧图自适应缩放'
tags:
  - sprite缩放
  - sprite自适应
  - 雪碧图缩放
  - 雪碧图自适应
id: 1255
categories:
  - HTML5/CSS3
date: 2015-08-20 17:52:05
---

ps: 以下实现都是基于移动端的处理

原图如下： 人物是采用的是雪碧图，通过坐标绝对数据取值

[![1](http://www.npm8.com/wp-content/uploads/2015/08/13.png)](http://www.npm8.com/wp-content/uploads/2015/08/13.png)

问题很明显，在缩放的屏幕上人物还是按照原尺寸大小显示

后来临时留了一节预备的方案：**CSS3的scale处理直接可以让元素缩放**

[![2](http://www.npm8.com/wp-content/uploads/2015/08/22.png)](http://www.npm8.com/wp-content/uploads/2015/08/22.png)

通过一个缩放的算放控制scale从而让雪碧图的元素可以缩放，目测还是不错。

但是这会带一系列的计算问题，因为通过sacle缩放后的元素，在浏览器布局中还是按照原尺寸计算的，所以这样的方案我也是非常的不满意

雪碧图常规的方案一般会做几套不同大小的图去适应不同的设备尺寸

这里我特指移动端单图的处理，采用的技术很简单CSS3一些知识点

先看看原图与处理后的效果

[![3](http://www.npm8.com/wp-content/uploads/2015/08/32.png)](http://www.npm8.com/wp-content/uploads/2015/08/32.png)[![4](http://www.npm8.com/wp-content/uploads/2015/08/4.gif)](http://www.npm8.com/wp-content/uploads/2015/08/4.gif)

&nbsp;

来讲解下原理，说白了很简单

先观察下矩阵的排量如上是行3 竖3 所以矩阵就是3*3的排列，但是这里只有8张图，怎么处理之后会讲

一般想让背景图填充整个元素在css3中可以通过background-size:100% 100%处理

显然不能让整图去填充元素，整图填充一个元素就是这效果

[![5](http://www.npm8.com/wp-content/uploads/2015/08/52.png)](http://www.npm8.com/wp-content/uploads/2015/08/52.png)

如何让单图填充一个元素呢? 这里我想到了一个办法，把整图整体缩放，额，就是整体缩放。。。

3*3的矩阵，我横竖按照矩形的数量比缩放100%
```css
background-size: 300% 300%;
```
这才是最关键的一步，这样单个元素显示一张图

[![6](http://www.npm8.com/wp-content/uploads/2015/08/62.png)](http://www.npm8.com/wp-content/uploads/2015/08/62.png)

到了这一步估计大家都猜出来了，很简单了，通过百分比去取图了

至于精灵动画实现的手段太多了，比如定时器的帧动画，CSS3的animation动画，canvas动画

说真的所有的方案我都实现过，包括在移动端上线测试等等

目前最为理想的就是通过CSS3关键帧处理动画，如果动画多写一堆的样式就是一个蛋疼的事

所以这里我建议可以采用脚本生成关键帧，通过内联style加载，哈哈~~~ 非常完美~

[![7](http://www.npm8.com/wp-content/uploads/2015/08/72.png)](http://www.npm8.com/wp-content/uploads/2015/08/72.png)

刚刚提到了如果3*3的矩阵，但是总数不到9个要如何处理？

所以这里我提供一个关键帧的算法给大家参考下，比较简单

[![8](http://www.npm8.com/wp-content/uploads/2015/08/82.png)](http://www.npm8.com/wp-content/uploads/2015/08/82.png)

&nbsp;

[查看演示](http://demo.grycheng.com/case/adaptive-sprite)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/08/adaptive-sprite.zip)

&nbsp;