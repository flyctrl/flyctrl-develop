---
title: 玩转HTML5移动页面(动效篇)
tags:
  - html5移动页面
id: 458
categories:
  - 移动前端
date: 2015-07-15 13:35:19
---

[![1](http://www.npm8.com/wp-content/uploads/2015/07/113.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/113.jpg)

1.快速输出静态页面

2.加上高级大气上档次狂拽炫酷屌炸天的动画让页面动起来

&emsp;&emsp;&emsp;作为一个有志向的前端，当然是选2啦！可是需求时间又很短很短，怎么办呢？

&emsp;&emsp;这次就来谈谈一些动画设计的小技巧，能在你时间不多又没有动画想法的时候瞬间让页面增色不少。

&emsp;&emsp;同时也会谈及移动端H5页面的优化细节与关键点，因此本文章将分为**动效篇**和**优化篇**。

====前方高能====

（1）  CSS3时序错开渐显动画

&emsp;&emsp;&emsp;这是一种比较常用的动画，它的优点是节奏感强，做法就是先让每个元素隐藏，然后当页面呈现后每个元素错开时间出现。

例子（忽略兼容前缀和无关属性）：
[![c1](http://www.npm8.com/wp-content/uploads/2015/07/c1.png)](http://www.npm8.com/wp-content/uploads/2015/07/c1.png)

[![c2](http://www.npm8.com/wp-content/uploads/2015/07/c2.png)](http://www.npm8.com/wp-content/uploads/2015/07/c2.png)

&emsp;&emsp;效果就是两个元素分别从上面掉下来，这里有个小细节（keyframes），为了让掉下来的动画生动点，应该是在90%的时候先掉下一点点，然后瞬间在100%时回跳5px。

&emsp;&emsp;还有个细节，安卓2.3.*不能良好支持-webkit-animation-fill-mode，也就是渐变动画不能停止在最后一帧。有这样一个解决方案：

1.用[Modernizr](http://modernizr.com/)去检测是否支持这个属性，加上识别类.no-animation-fill-mode；

2.根据识别类采取以下措施：

（1）用js模拟同样效果；

（2）用css屏蔽掉动画；

（3）或者直接全部都用transition来做（不要keyframes）。

示例页面如下

[![2](http://www.npm8.com/wp-content/uploads/2015/07/22.gif)](http://www.npm8.com/wp-content/uploads/2015/07/22.gif)

2） CSS3细节强调动画

&emsp;&emsp;一些局部细节如果还是渐现显示，会枯燥没什么感觉，例如标题、按钮等，需要一种强调。

分两种情况：

1.如果时间允许的话，基本做法是先把一个元素切成不同的块状，例如小人的手脚都切成不同图片，然后让它们重新组合，再通过赋予不同的CSS动画来让它生动起来，这里引用个webank的例子：

[![3](http://www.npm8.com/wp-content/uploads/2015/07/3.gif)](http://www.npm8.com/wp-content/uploads/2015/07/3.gif)

2.如果时间紧凑，又不像桑尼一样擅长于动画细节，可以使用一些辅助工具：
[Animate.css](http://daneden.github.io/animate.css/)，通过直接预览选择想要的动效，然后下载它的CSS把对应的keyframe扒下来就好了（引用整个CSS是资源浪费）。

（3）SVG动画
&emsp;&emsp;SVG技术越来越不陌生，使用门槛也渐渐降低，而且SVG动画还可以使用CSS控制。

先看个生日页面，是个SVG的蛋糕：
[![4](http://www.npm8.com/wp-content/uploads/2015/07/41.gif)](http://www.npm8.com/wp-content/uploads/2015/07/41.gif)

可见SVG是很强大的！弥补了CSS3的不足。

&emsp;&emsp;然而这种动画也是略耗时，但有一种比较常用的，就是线条的描绘动画，CSS3比较难实现，这里可以用SVG，看图：

[![5](http://www.npm8.com/wp-content/uploads/2015/07/51.gif)](http://www.npm8.com/wp-content/uploads/2015/07/51.gif)

&emsp;&emsp;介绍一个PS插件[svgArtisan](https://github.com/janily/svgartisan)（目前还未有主页），这个工具可以直接根据PSD的路径图层生成SVG图形。
&emsp;&emsp;接下来就简单了，将设计稿上的路径图形用插件生成对应的SVG，例如是这样的：

（注意，其中的foreignObject标签内是不支持svg的浏览器会看到一张.m3-svg-nosupport标签下的图片。）
[![c3](http://www.npm8.com/wp-content/uploads/2015/07/c3.png)](http://www.npm8.com/wp-content/uploads/2015/07/c3.png)

再使用CSS3的animation控制stroke-dashoffset：
[![c4](http://www.npm8.com/wp-content/uploads/2015/07/c4.png)](http://www.npm8.com/wp-content/uploads/2015/07/c4.png)


效果不难吧！SVG还有各种用途，例如制作ICONFONT等，可以深入挖掘。

（4） 重力陀螺仪

&emsp;&emsp;想让页面更有层次感，不妨让设计提供一些碎片元素，例如彩花，星星之类，然后把它们单独切出来放画面前景，使用陀螺仪伴随着手机运动碎片也跟着运动，多么好玩！

&emsp;&emsp;这里提供一个工具可以轻松实现陀螺仪重力效果的：[parallax.js](http://matthew.wagerfield.com/parallax/)

&emsp;&emsp;用法简单，定义一个parallax-obj的父类，把需要动的元素加上layer的类，然后设置动的范围data-depth：
[![c5](http://www.npm8.com/wp-content/uploads/2015/07/c5.png)](http://www.npm8.com/wp-content/uploads/2015/07/c5.png)

（5） 背景音乐&amp;音效

&emsp;&emsp;H5页面要炫酷，画面生动还是不够的，一定要配合生动的音乐。因此可以主动跟设计或产品沟通，让他们可以提供音乐资源，分分钟导致UV猛涨有木有！

当然，有了音乐，前端也不是直接引用的，还是有点要求：

1.音乐不宜过长，30s为佳，而且音乐要加上渐现渐隐效果，方便循环播放；

2.音乐体积要小，音质和流量，在手机上还是优先考虑流量吧。

一般背景音乐体积可以接受的范围是200K以下，若太大，可以使用格式工厂等软件，降低它的比特率和声道来改变体积。

接着，只需要简单引用：
[![c6](http://www.npm8.com/wp-content/uploads/2015/07/c6.png)](http://www.npm8.com/wp-content/uploads/2015/07/c6.png)

&emsp;&emsp;这里有个问题，IOS是不能自动播放音乐的，一定要触发一个用户交互事件，例如点击。
&emsp;&emsp;但是有一种hack的方法可以让IOS微信侧页面自动播放（SAFARI依旧无效）：
&emsp;&emsp;通过new一张图片，监听一张图片的onload事件，结束后回调执行音频播放audio.play()即可，原理估计是动了dom结构，相当于执行了一次交互。（有人也用过createEvent模拟，原理也是动了dom。）
&emsp;&emsp;因此，记得暴露一个音乐关闭/打开的按钮，不然肯定被用户骂死。
&nbsp;

（6）有趣的loading

Loading页还是要有的，万一用户网速慢呢?

&emsp;&emsp;以上做了那么多事，如果没有资源加载都是玩不来的，因此还需要一个loading的支持。一般情况下页面体积大于3m则要加上loading页。

&nbsp;
然而loading还是可以做得很有趣的，一般的做法是：

1.引入品牌，例如APP宣传页;

2.引入有趣动画，放一个贱贱的人物跳舞给你看；

3.一切从简，用CSS3简单动画。

====最后总结====
最后，给一个例子结尾吧。


&emsp;&emsp;这是空间5.0预约页第二版，使用了以上的若干方法论，例如loading动画，CSS3动画，SVG星空连线，首屏星球重力感应，音乐（这里使用开启按钮后播放）等等。
（由于活动已结束，很多运营处都被删掉从简了，忽略那些细节）
[![6](http://www.npm8.com/wp-content/uploads/2015/07/6.gif)](http://www.npm8.com/wp-content/uploads/2015/07/6.gif)

&emsp;&emsp;当然，真正要做到高效制作动态H5页面，还是靠积累，因此平时做好的细节动画自己都积累起来，下次分分钟就能用得上。
