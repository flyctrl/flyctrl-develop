---
title: 使用rem设置文字大小
tags:
  - rem设置字体大小
id: 815
categories:
  - 移动前端
date: 2015-07-24 12:49:14
---

&emsp;&emsp;由于最近在做移动方面的重构项目，大量的运用到了rem的单位值，深深的感觉到rem这个单位的强大，所以在这里推荐一篇淘宝的文章给大家了解下rem的一些基本用法。后续我还会出一篇关于rem更多的使用方法的文章分享给大家。

&emsp;&emsp;**响应式网页不仅仅是响应不同类型的设备，而且需要响应不同的用户需求。响应式的初衷<strong>是为了让信息更好的传递交流，让所有人无障碍的获取信息，同时这也是 Web 的初衷。**

&emsp;&emsp;序言中同样提到，响应式的设计应该秉承「**内容优先，移动优先**」的设计原则，那么我们知道网页中的内容主要是由文字图片等元素组成的，那么文字该如何响应式呢？

&emsp;&emsp;当我们每天面对缤纷的互联网世界的时候，文字不仅仅传递给我们众多的信息资讯，而且在设计师的手里，文字在网页中的排版承载着一种艺术的直觉。

&emsp;&emsp;网页中常用的文字大小单位是 px(Pixels)，em，现在[《CSS Values and Units Module Level 3》](http://dev.w3.org/csswg/css-values/#rem-unit)中新增了 rem 这个单位。

## **一、那到底什么是 rem 呢？**

规范中明确写道：
Equal to the computed value of ‘`font-size`’ on the root element.

**「rem」是指根元素（root element，html）的字体大小，好开心的是，从遥远的 IE6 到版本帝 Chrome 他们都约好了，<strong>根元素默认的 font-size 都是 16px。这样一个新的单位兼容性如何呢？**</strong>

[![a](http://www.npm8.com/wp-content/uploads/2015/07/a4-650x251.png)](http://www.npm8.com/wp-content/uploads/2015/07/a4.png)

&emsp;&emsp;太好了，IE9+，Firefox、Chrome、Safari、Opera 的主流版本都支持了，我可以放肆的使用 rem 了。

&emsp;&emsp;可是，W3C 那些家伙为什么要闲着下面疼的新增这样一个单位呢？它和 em 有啥区别呢？

&emsp;&emsp;我们知道 em 的计算是基于父级元素的，在实际使用中给我们的计算带来了很大的不便。所以 rem 的出现解救了我这样不会算术的人，再也不用担心父级元素的 font-size 了，因为它始终是基于根元素（html） 的。

&emsp;&emsp;比如默认的 html font-size=16px，那么我想设置12px 的文字就是：12÷16=0.75（rem）

&emsp;&emsp;当然，你可以引入 CSS 预处理工具（Sass、LESS 、Stylus等）自动计算 rem 值，这里就不一一举例了。

&emsp;&emsp;但是像我这样的懒人或者团队开发中还没有引入 CSS 预处理工具的该肿么办呢？只能搬个计算器啪啪啪了吗？别急，你还可以变通一下。我们改变一下 html 的默认 font-size=10px 不就好计算了嘛！Like this：
```css
html{
    font-size:62.5%; /* 10÷16=62.5% */
}
body{
    font-size:12px;
    font-size:1.2rem ; /* 12÷10=1.2 */
}
p{
    font-size:14px;
    font-size:1.4rem;
}
```
&emsp;&emsp;需要注意的是，为了兼容不支持 rem 的浏览器，我们需要在 rem 前面写上对应的 px 值，这样不支持的浏览器可以优雅降级。其实不用太纠结是默认的 font-size:100%，还是设置为 font-size:62.5%，如果你引入了 CSS 预处理工具那么自然可以使用默认值，如果由于其他原因使用 font-size:62.5% 也无可厚非，完全可以在 body 中重置回你需要的默认 font-size。

## **二、为啥要用 rem 呢？**

**黑夜给了我黑色的眼睛，我将用它寻找关怀。**

&emsp;&emsp;浏览器中用户都是可以自定义默认的文字大小的，如果使用 px，用户自行在浏览器设置中改变了文字大小后，网页上是不会变化的。我们不能排除视障用户（如近视）、老年用户不会这么做，作为一个具有「人文关怀」的前端，我们完全可以考虑这些情况。由其是在引入了 CSS预处理工具之后，这几乎不会增加什么成本。

&emsp;&emsp;也再次印证前面提到的：**响应式网页不仅仅是响应不同类型的设备，而且需要响应不同的用户需求。**

各个浏览器的设置方法如下：

1.  IE浏览器：按下 Alt 键，打开菜单栏→查看→字体大小
[![b](http://www.npm8.com/wp-content/uploads/2015/07/b3.png)](http://www.npm8.com/wp-content/uploads/2015/07/b3.png)
2.  Chrome 浏览器：设置→显示高级设置→网页内容
[![c](http://www.npm8.com/wp-content/uploads/2015/07/c8.png)](http://www.npm8.com/wp-content/uploads/2015/07/c8.png)
3.  Firefox 浏览器：按下 Alt 键，打开菜单栏→工具→选项→内容选项卡
[![d](http://www.npm8.com/wp-content/uploads/2015/07/d1.png)](http://www.npm8.com/wp-content/uploads/2015/07/d1.png)
4.  其他浏览器就不一一举例了……

## **三、什么时候用 rem？**

&emsp;&emsp;既然 rem 的可用性更好，是不是在所有地方都去使用呢？别捉急，通常在标题，正文等大面积文字的位置可以使用 rem。但是在一些特殊的设计场景，rem 可能会导致布局错位，比如这样一个回顶部的按钮：

[![e](http://www.npm8.com/wp-content/uploads/2015/07/e.png)](http://www.npm8.com/wp-content/uploads/2015/07/e.png)

&emsp;&emsp;所以，什么时候用 rem，如何用好 rem？ 这也需要你拿出 18K的黑色乌金睛来照亮整个页面。让我们一起：

**抛开布局，响应文字；抛开成见，响应内心。**

在面对响应式开发的时候，什么才是合适的，什么是不合适的，你真的想好了吗？

&nbsp;