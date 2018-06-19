---
title: 网页中插入FLASH（swf文件），并且让Flash不遮挡HTML元素
tags:
  - Flash不遮挡HTML
id: 1267
categories:
  - 前端杂货
date: 2015-08-24 12:50:40
---

## 一：网页中插入flash代码如下：

&emsp;&emsp;当然里面的很多属性可以去掉，根据具体的需求而定。
我们在网页中经常遇到播放flash，要正常播放flash就要用到OBJECT和EMBED这两个标签。鉴于火狐及IE等不同浏览器厂商的不兼容性。播放flash也不相同。
OBJECT标签：用于windows平台的IE浏览器，利用Activex控件来播放flash。
EMBED标签：用于windows和Macintosh平台下的NetscapeNavigator浏览器，使用Netscape插件技术来播放flash。

为了兼容各浏览器我们通常这样写，如例：
```html
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100%" height="100%"
codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">
<param name="movie" value="flash/flash1.swf">
<param name="quality" value="high">
<param name="bgcolor" value="#F0F0F0">
<param name="menu" value="false">
<param name="wmode" value="opaque"><!--Window|Opaque|Transparent-->
<param name="FlashVars" value="">
<param name="allowScriptAccess" value="sameDomain">
<embed id="forfunex" src="flash/flash1.swf"
width="100%"
height="100%"
align="middle"
quality="high"
bgcolor="#f0fff8"
menu="false"
play="true"
loop="false"
FlashVars=""
allowScriptAccess="sameDomain"
type="application/x-shockwave-flash"
pluginspage="http://www.adobe.com/go/getflashplayer" wmode="opaque">
</embed>
</object>
```
&emsp;&emsp;目的是IE浏览器用OBJECT而会忽略EMBED标签的内容。而火狐等浏览器用EMBED忽略OBJECT等标签内容

&nbsp;

## 二：让Flash不遮挡HTML元素

&emsp;&emsp;让flash置于DIV层之下的方法，让flash不挡住飘浮层或下拉菜单，让Flash不档住浮动对象或层的关键参数：wmode=opaque。

方法如下：

针对IE 在```<object></object>```内加上参数```<param name="wmode" value="opaque" />```

针对FF 在```<embed />```内加上参数wmode="opaque"

其中如果要透明的Flash
让Flash透明的关键属性：
```<param name="wmode" value="transparent">```

wmode 属性/参数值 Window | Opaque | Transparent
模板变量：$WM，（可选）允许使用 Internet Explorer 4.0 中的透明 Flash 内容、绝对定位和分层显示功能。此标记/属性仅在带有 Flash Player ActiveX 控件的 Windows 中有效。

"Window"在 Web 页上用影片自己的矩形窗口来播放应用程序。"Window"表明此 Flash 应用程序与 HTML 层没有任何交互，并且始终位于最顶层。

"Opaque" 使应用程序隐藏页面上位于它后面的所有内容。

"Transparent"使 HTML 页的背景可以透过应用程序的所有透明部分显示出来，并且可能会降低动画性能。

"Opaque windowless"和"Transparent windowless"都可与 HTML 层交互，从而允许 SWF 文件上方的层遮蔽应用程序。这两种选项之间的差异在于"Transparent"允许透明，因此，如果 SWF 文件的某一部分是透明的，则 SWF 文件下方的 HTML 层可以透过该部分显示出来，而"opaque"则不会显示。

如果忽略此属性，默认值为 Window。仅适用于 object。

&nbsp;