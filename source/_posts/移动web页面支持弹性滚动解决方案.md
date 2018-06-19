---
title: 移动web页面支持弹性滚动解决方案
tags:
  - css弹性滚动方案
  - 移动web页面支持弹性滚动解决方案
id: 2139
categories:
  - HTML5/CSS3
date: 2016-03-08 14:29:47
---

&emsp;&emsp;一直折腾移动端页面弹性滚动的各种问题，做了点研究，今天做个小分享，首先本人不建议使用第三方js插件来做，一方面性能方面不是很好，另外一方面本身移动端的网络不是很快也不是稳定，加载会出现卡顿现象或者是运行出现问题，落叶归根，一切回归本质，强大的css3给予我们无比的力量！

&emsp;&emsp;传统 pc 端中，子容器高度超出父容器高度，通常使用 overflow:auto 可出现滚动条拖动显示溢出的内容，而移动web开发中，由于浏览器厂商的系统不同、版本不同，导致有部分机型不支持对弹性滚动，从而在开发中制造了所谓的 BUG。
[![移动web页面支持弹性滚动的方案](http://www.npm8.com/wp-content/uploads/2016/03/181617012583211-660x483.png)](http://www.npm8.com/wp-content/uploads/2016/03/181617012583211.png)

&emsp;&emsp;上图如果在PC端中，我们可以利用 position:fixed 和 overflow:auto 进行简单的布局实现我们需要的效果，而在手机端遇到的问题如下：

*   **ios4 和 android2.2 以下不支持 position:fixed**
*   **ios 和 android2.3 以下不支持 overflow:auto**
*   **ios4 和 android 不支持 overflow-scrolling**

最严重的结果是：滚动区域内容无法拖动

## 对于 ios4 和 android2.2 以下不支持 position:fixed 的问题，有2种布局方法可以替代。

**布局一： 定义页面整体高度为100%，然后使用 position:absolute 布局可解决**
```css
/*
<!--absolute布局 [[ -->
<body>
<div class="wrap">
<div class="header">header</div>
<div class="main">
弹性滚动区域
</div>
<div class="footer">footer</div>
</div>
</body>
<!--absolute布局 ]] -->
*/
html,body{height:100%;}
.wrap{width:100%;}
.header,.footer{height:40px;line-height:40px;background-color:#D8D8D8;text-align:center;}
.header{position: absolute;top:0;left:0;width:100%;}
.footer{position: absolute;bottom:0;left:0;width:100%;}
.main{position:absolute;z-index:1;top:40px;left:0;bottom:40px;width:100%;}
```
**布局二： 定义页面整体高度为100%，然后使用 display:flex 布局可解决**
```css
/*
<!-- flex布局 [[ -->
<body>
<div class="wrap">
<div class="header">header</div>
<div class="main">
弹性滚动区域
</div>
<div class="footer">footer</div>
</div>
</body>
<!-- flex布局 ]] -->
*/
html,body{height:100%;}
.wrap{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;}
.header,.footer{height:40px;line-height:40px;background-color:#D8D8D8;text-align:center;}
.main{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%;}
```

## 那么剩下的主要问题是**子容器高度超出父容器高度，子容器内容如何弹性滚动。**

&emsp;&emsp;对于如何使用弹性滚动，这里并没有最好的方案，具体看产品的用户群、产品的定位等，简单介绍下：

**方案一： overflow:auto****和-webkit-overflow-scrolling: touch**

**适合场景：**
产品的用户群大多为 ios5+、android4+ 用户，建议采用 overflow-scrolling 做差异化体验，毕竟 iscroll4.js 在 android 机器下体验不顺畅，另外还加载了 10K 多的 js 代码。

&emsp;&emsp;overflow:auto 写法在 winphone8 和 android4+ 上有用。ios5+ 版本增加了一个新的属性：overflow-scrolling 这个属性可以激活平滑滚动，效果不错。
```css
.css{
overflow:auto;/* winphone8和android4+ */
-webkit-overflow-scrolling: touch; /* ios5+ */
}
```
flex体验demo：

[http://demo.grycheng.com/case/csshuadong.html](http://demo.grycheng.com/case/csshuadong.html)

[![](http://www.npm8.com/wp-content/uploads/2016/03/2.png)](http://www.npm8.com/wp-content/uploads/2016/03/2.png)

**方案二： iscroll4.js和overflow:auto**

**适合场景：**
产品的用户群有 ios 和大部分 android2+ 用户，而在 android 中的页面数据比较简单(通常弹性滚动数据只有文字)，那么使用 iscroll4.js 可保证 android2+ 的机器展现正常也不卡顿，让ios用户滚动更顺畅。

&emsp;&emsp;使用 iscroll4.js 基本上解决了页面弹性滚动的问题，总结下 iscroll4.js 的体验：

*   在 ios 系统上的表现十分良好，滚动顺畅
*   在部分 android 系统上性能较差，特别是滚动区域内容多时，滚动页面会出现卡顿
*   ios 和 android 系统下有不少 bug，如表单获焦弹出软键盘后页面高度没有重新计算、出现闪屏等(这里不做讨论)
*   winphone 不支持
那么这里的处理方案是，页面初始化时判断是 weibit 浏览器则启用 iscroll4.js
```html
<div class="wap ie-ova" id=""><!-- webkit 用户设置 ID 为 iscroll，可启用iscroll -->
    ...
</div>
```
winphone8 手机使用如下 hack
```css
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
.ie-ova{overflow:auto;} /* winphone8 */
}
```
**方案三： iscroll4.js和overflow:auto和android2x.css**

**适合场景：**
产品的用户群有 ios 和大部分 android2+ 用户，而在 android 中页面数据比较复杂(通常弹性滚动数据有大量图片)，那么可针对 android2+ 的机器做静态定位展现(position:static)，页面不具备滚动效果，而对于 ios 用户仍然使用 iscroll4.js。
```html
<link rel="stylesheet" href="android2x.css"><!-- android2+ 用户多引用的css文件 -->
```
```css
.css{
overflow:auto;/* winphone8和android4+ */
}
```
```html
<div class="wap" id=""><!-- ios 用户设置 ID 为 iscroll，可启用iscroll -->
    ...
</div>
```