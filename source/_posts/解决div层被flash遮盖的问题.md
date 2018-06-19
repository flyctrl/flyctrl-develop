---
title: 解决div层被flash遮盖的问题
tags:
  - div被flash遮盖
id: 1110
categories:
  - 前端杂货
date: 2015-08-04 22:40:21
---

&emsp;&emsp;页面构建中的Flash层会遮挡Div的问题，一般通过设置wmode="transparent" 或wmode="window"就可以解决。不过对于Flash视频这个貌似不太凑效。

对于Flash遮挡的问题，首先来了解一些wmode的一些属性值。

## wmode的5种取值

### Window模式
&emsp;&emsp;默认情况下的显示模式，在这种模式下 flash player 有自己的窗口句柄，这就意味着 flash 影片是存在于 Windows 中的一个显示实例，并且是在浏览器核心显示窗口之上的，所以 flash 只是貌似显示在浏览器中，但这也是 flash 最快最有效率的渲染模式。由于他是独立于浏览器的HTML渲染表面，这就导致默认显示方式下flash总是会遮住位置与他重合的所有 HTML 层。

### Opaque模式
&emsp;&emsp;这是一种无窗口模式，在这种情况下flash player没有自己的窗口句柄，这就需要浏览器需要告诉flash player在浏览器的渲染表面绘制的时间和位置。这时flash影片就不会在高于浏览器HTML渲染表面而是与其他元素一样在同一个页面上，因此你就可以使用 z-index 值来控制 HTML 元素是遮盖 flash 或者被遮盖。

### Transparent模式
&emsp;&emsp;透明模式，在这种模式下 flash player 会将 stage 的背景色 alpha 值降为 0 并且只会绘制 stage 上真实可见的对象，同样你也可以使用 z-index 来控制 flash 影片的层级值，但是与 Opaque 模式不同的是这样做会降低 flash 影片的回放效果，而且在 9.0.115 之前的 flash player 版本设置 wmode="opaque" 或 "transparent" 会导致全屏模式失效。

### Direct模式
&emsp;&emsp;直接渲染模式，在该模式下，flash player 可以通过硬件直接对画面进行合成，并呈现在屏幕上。使用这种模式能够得到比 window 模式更好的渲染效果，特别是在视频播放方面，如果页面的 flash 需要使用了 stagevideo 或者 stage3D，那么必须使用这种模式。它有比 window 模式更好的渲染，但也有 window 模式下的所有缺点。

### GPU模式
&emsp;&emsp;在一些网络电视和移动设备上可以启用额外的硬件加速，与其他 wmode 值模式相比，显示序列的像素保真度无法保证，其他方面跟 direct 模式相似。

&nbsp;

## div遮盖Flash层测试结论

1.使用 opaque/transparent 模式，只需 div 就可以遮挡住 Flash，对于Flash视频，IE中的div层需要嵌套iframe标签才可以遮挡；

2.使用 window/direct/gpu 模式：

* IE 需要借助 iframe 才能遮挡 Flash
* Chrome 仅 div 即可遮挡 Flash
* Firefox 当使用 rgba 的半透明背景色浮层时，无法遮挡 Flash，只有具有背景色(background-color:#fff)的元素才能遮挡 Flash，透明背景(background:transparent)，或者背景颜色为半透明(background-color:rgba(255,255,255,0.5))，或者使用半透明图片(background:url(alpha.png))做背景的元素都无法遮挡 Flash
Windows Safari 即使 iframe 也无法遮挡 Flash
Mac 系统下 wmode 取任何值， div 元素都能轻松遮挡 Flash 元素
&nbsp;