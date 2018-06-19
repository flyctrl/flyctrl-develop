---
title: 移动web开发常见问题解决方案
tags:
  - 移动web开发
id: 127
categories:
  - 移动前端
date: 2015-07-12 18:37:23
---

### [![1](http://www.npm8.com/wp-content/uploads/2015/07/11.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/11.jpg)

### 1、```<meta>```元素

&emsp;meta 标签位于 head 标签之间，是 HTML 语言的一个辅助性标签，合理的设置在移动端中起着非常重要的作用。下面列举几个常用的用法：
```html
        // 强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport">

        // 禁止百度SiteApp转码声明
        <meta http-equiv="Cache-Control" content="no-siteapp">

        // 禁止自动识别电话和邮箱；
        <meta name="format-detection" content="telephone=no, email=no">

        // 指定iphone中safari顶端的状态条的样式(default：白色；black：黑色；black-translucent ：半透明)；
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

        // 添加到 IOS 主屏后的标题 
        <meta name="apple-mobile-web-app-title" content="觉唯设计">

        // 隐藏地址栏，启用 WebApp 全屏模式
	<meta name="apple-mobile-web-app-capable" content="yes">

	// 优先使用 IE 最新版本和 Chrome
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

        // 注明作者
        <meta name="author" content="www.npm8.com">
```

### 2、font-family 字体选择

```css
body {font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;}
```
&emsp;&emsp;iOS 4.0+ 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica。中文字体设置为华文黑体STHeiTi（中文名称叫黑体-简）。设计时候一般用华文黑体来代替，两者差异微小。

### 3、使用 rem 替代 em 单位

&emsp;&emsp;rem（root element，html）是 CSS3 新增的一个相对单位，相对于根目录的 em 而不是相对于父元素，也就是说，它虽然是相对值，但是只是相对于根目录来说的（也就是 html），它不会随着其它元素的改变而改变。通过它既可以做到只修改根元素就成比例的调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。从而可以有效的快速保持任何分辨率下保持视觉一致。

### 4、禁止选择

&emsp;&emsp;当你希望页面上的文字或者图片不被用户选择时候亦或者禁止长按保存图片时，可以使用这个方法来实现。是不是很方便的说，但注意的是不可滥用，否则会出现一些无法输入或者点击的情况。
```css
    a, img {
       -webkit-touch-callout:none;  /* 禁止长按链接与图片弹出菜单 */
    }

    html, body {
       -webkit-user-select:none;   /* 禁止选中文本（如无文本选中需求，此为必选项） */
       user-select:none;
    }
```

### 5、html5重力感应事件

还记得满大街的摇一摇抽奖吗？大部分核心代码就是这个。
```javascript
        if (window.DeviceMotionEvent) { 
            window.addEventListener('devicemotion',deviceMotionHandler, false);  
        } 
        var speed = 30;//speed
        var x = y = z = lastX = lastY = lastZ = 0;
        function deviceMotionHandler(eventData) {  
            var acceleration =event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed) {
                alert('别摇那么大力嘛...');
                // your code here
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
```

### 6、CSS3动效类型

常见的CSS3动画效果类型：

[![2](http://www.npm8.com/wp-content/uploads/2015/07/21.png)](http://www.npm8.com/wp-content/uploads/2015/07/21.png)

&nbsp;

### 7、touch优化点击事件

&emsp;&emsp;移动端上touch事件有四个，其触发顺序为：
```touchstart -> touchmove ->  touchend -> touchcancel```
在移动端 click 会有 300ms 的延迟，所以体验十分差，建议封装的 tap 事件来代替 click 事件（其实 tap 是由 touchstart 事件 + touchmove 判断 + touchend 事件封装组成）。

&emsp;&emsp;**注：对于某些 android 系统 touch 的 bug:**
比如手指在屏幕由上向下拖动页面时，理论上是会触发 一个 touchstart ，很多次 touchmove ，和最终的 touchend ，可是在android 4.0上，touchmove只被触发一次，触发时间和touchstart 差不多，而touchend直接没有被触发。这是一个非常严重的bug，在google Issue已有不少人提出 ,这个很蛋疼的bug是在模拟下拉刷新是遇到的尤其当touchmove的dom节点数量变多时比出现，当时解决办法就是用settimeout来稀释touchmove。

### 8、base64编码图片替换小图片

&emsp;&emsp;对于一些小图片icon之类的，可以将图片用base64编码，来减少网络请求。但是对于大图，就不要使用base64编码了，不然你的代码会变成无底洞，拉代码滚动条拉到你想哭。编码和解码也需要计算量，比较耗费CPU。

base64有以下几个优点：

*   减少了HTTP网络请求
*   避免某些文件跨域的问题
*   修改无需清缓冲，立即生效

### 9、开启硬件加速优化动画效果

&emsp;&emsp;如果你涉及到动画制作，是否经常发现在PC端效果非常不错，但是到了手机上就卡翔了。这个时候我们可以通过CSS开启硬件加速来改善动画效果，像Chrome, FireFox, Safari, IE9+和最新版本的Opera都支持硬件加速。CSS animations, transforms 以及 transitions 默认是不会自动开启GPU加速，而是需要某些CSS规则来触发，例如：transform: translate3d。开启硬件加速后可以解决页面闪白等问题，可以让渲染更流畅。

### 10、布局使用display弹性自适应

&emsp;&emsp;内容排版布局显示，尽量少使用float，建议使用display的box、flex等（多栏）自适应布局；优点表现在：

*   独立的高度控制与对齐
*   独立的元素顺序
*   指定元素之间的关系
*   灵活的尺寸和对齐方式

### 11、增加按钮:active反应效果

&emsp;&emsp;当用户在操作按钮的时候，如果按钮还是死死的，没有任何反应，这样子的体验是很差的，甚至是反人类的。在pc端我们都会习惯加上hover属性，来改变按钮状态；但移动端可不买这家伙的帐，在移动端没有鼠标一说，这个时候我们就可以让active上场了，带来的效果也是杠杠的。

### 12、设置CSS3(@media)横竖屏样式
```css
	//竖屏时使用的样式
	@media all and (orientation:portrait) {
		code here ...
	}

	//横屏时使用的样式
	@media all and (orientation:landscape) {
	        code here ...
	}
```