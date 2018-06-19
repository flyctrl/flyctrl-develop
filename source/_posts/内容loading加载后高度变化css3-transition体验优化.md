---
title: 内容loading加载后高度变化CSS3 transition体验优化
tags:
  - css3体验
id: 104
categories:
  - HTML5/CSS3
date: 2015-07-12 01:18:51
---
### 一、概述
&emsp;&emsp;现在web技术不断发展，视图与数据渲染更多由前端呈现，后台更多与数据打交道。于是，我们会经常看到这样的交互场景。页面加载，看到一个框框里面有个菊花在转，然后内容呈现；或者点击个按钮，菊花在转，然后列表动态加载呈现。例如：

[![2015-01-22_143754](http://www.npm8.com/wp-content/uploads/2015/07/2015-01-22_143754-300x99.png)](http://www.npm8.com/wp-content/uploads/2015/07/2015-01-22_143754.png)

&emsp;&emsp;是不是没有任何问题？确实，功能上OK，有菊花，用户也愿意等。但是，大家有没有觉得所有交互，出现菊花→出现内容，都是“砰砰砰”很生硬的感觉，尤其当内容是动态，高度不确定的时候。我们使用一些比较好的手机APP(如微信)的时候一定不会有这样的感觉，整个交互流程都是很流畅的，就像山涧的泉水，涓涓细流到山脚，而不是巨人在峡谷走路的感觉。

&emsp;&emsp;所以，如果菊花的呈现到内容的展示能够通过自然的动画过渡呈现，势必会增强用户体验。

&emsp;&emsp;而动态内容呈现主要变化的关键因素就是——**高度**，而过渡效果最佳利器是CSS3 transition, 于是，脑中不禁疑问，是不是可以借助CSS3 transition实现动态内容的高度动画呈现，渐进增强用户体验。

&emsp;&emsp;其实，早在12年的时候，我就开始了这方面的尝试，我自己也瞅了瞅，发现当年的我讲废话的本领甩了现在的我两条长安街。大家直接从Part5 看就好了。其中，受限于当年略显稚嫩的技术，里面获得容器高度的方法，有些傻，大家就假装没看到。

### 二、CSS3 transition的难点

&emsp;&emsp;如果直接一行CSS代码就可以让动态呈现动画化，那就不需要本文了，早就各个站点都是这类优质体验的交互了。究其根本就是CSS3 transition的一个局限性，对`"auto"`*冷淡！嘛意思？

&emsp;&emsp;大家很好理解，所谓“过渡”，就是从一个地方到另外一个地方，比方说，从`0`到`100`. 但是，你来个从`0`到`auto`, 傻眼了吧。大学时看过一部美国科幻片《心灵传输者》，其中男主也不是想瞬间位移就瞬间位移的，也是需要知道目的地和路径的。

&emsp;&emsp;然而，当我们在一个`div`呈现动态内容的时候，由于我们并不知道里面的内容(都说了是动态的嘛)，所以，我们的`height`其实都是`auto`，于是，就算`transition: height .35s`走起，也不会有动画效果的，我们需要的是固定值。

于是难点和关键点来了，**如何赋予固定高度值？**

### 三、固定高度值与transition触发

&emsp;&emsp;说白了很简单，当前高度固定值，获得动态内容载入后的高度固定值，再`style`设置，over~

&emsp;&emsp;代码细节我就不讲了，其实没什么人关心的，“我需要的是代码，代码！”估计很多人心里是这么咆哮的。
```javascript
// 高度无缝动画方法
var funTransitionHeight = function(element, time) { // time, 数值，可缺省
    if (typeof window.getComputedStyle == "undefined") return;

    var height = window.getComputedStyle(element).height;

    element.style.transition = "none";    // 本行2015-05-20新增，mac Safari下，貌似auto也会触发transition, 故要none下~

    element.style.height = "auto";
    var targetHeight = window.getComputedStyle(element).height;
    element.style.height = height;
    element.offsetWidth = element.offsetWidth;
    if (time) element.style.transition = "height "+ time +"ms";
    element.style.height = targetHeight;
};
```
十行出头点代码。

`element`就是容器元素；如果`transition`你是写在CSS中的，`time`参数可以不要，例如：
```javascript
element { transition: height 250ms; overflow: hidden; }
funTransitionHeight(element)
```
&emsp;&emsp;`funTransitionHeight`名字如果你不喜欢，可以自己改掉。IE9+有效，IE10+有动画，IE6~IE8老样子，所谓渐进增强。
点击页面上“点击我”按钮，里面就有有高度不固定内容呈现，大伙儿就可以看到内容呈现时候不是砰砰砰了，而是歘歘歘~
[![a](http://www.npm8.com/wp-content/uploads/2015/07/a.png)
](http://www.npm8.com/wp-content/uploads/2015/07/a.png)[![b](http://www.npm8.com/wp-content/uploads/2015/07/b-300x223.gif)
](http://www.npm8.com/wp-content/uploads/2015/07/b.gif)

&emsp;&emsp;如何调用？很简单，初始化时候`funTransitionHeight()`一下，赋个固定值；然后每次菊花完毕，内容载入后在`funTransitionHeight()`一下，动画就来啦。也就是说，相比你们以前的JS代码，就多了一行`funTransitionHeight(element)`调用而已，是不是实用又低成本！