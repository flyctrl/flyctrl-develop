---
title: 炫酷全屏式的弹窗jQuery插件 – animatedModal.js
tags:
  - animatedModal.js
  - 全屏式的弹窗插件
id: 2162
categories:
  - 插件库
date: 2016-03-07 16:30:46
---

&emsp;&emsp;animatedModal.js 是一个全屏式的弹窗jQuery插件，而且弹出效果很漂亮，全屏的弹窗特别适用于移动手机网站，所以做响应式网页的设计师们可以尝试使用这款插件。

&emsp;&emsp;animatedModal.js 的弹出动画可以结合 [animate.css](http://www.npm8.com/?p=502) 这个样式库来实现漂亮酷弦的动画特效。

[![animated-modal-jquery-plugin](http://www.npm8.com/wp-content/uploads/2016/03/animated-modal-jquery-plugin.jpg)](http://www.npm8.com/wp-content/uploads/2016/03/animated-modal-jquery-plugin.jpg)

&emsp;&emsp;插件的min版只有2KB大小，对于普通站来这不算什么了，下面一起看看该弹窗代码的DEMO效果，真很好看，扁平化的风格设计。

&nbsp;

![animated-modal-demo](http://www.npm8.com/wp-content/uploads/2016/03/animated-modal-demo.gif)

&nbsp;

![animated-modal-demo-2](http://www.npm8.com/wp-content/uploads/2016/03/animated-modal-demo-2.gif)

&nbsp;

![animated-modal-demo-3](http://www.npm8.com/wp-content/uploads/2016/03/animated-modal-demo-3.gif)

### 插件兼容性

*   IE10+
*   Chrome
*   Firefox
*   Safari
*   Opera

### 使用教程

**STEP1: 在head内引入animate.css样式库**
```html
<head>
<link rel="stylesheet" href="animate.min.css">
</head>
```
**STEP2: HTML代码：在<body>内加入以下代码**
```html
<body>
<!--Call your modal-->
<a id="demo01" href="#animatedModal">DEMO01</a>

<!--DEMO01-->
<div id="animatedModal">
<!--THIS IS IMPORTANT! to close the modal, the class name has to match the name given on the ID  class="close-animatedModal" -->
<div class="close-animatedModal"> 
CLOSE MODAL
</div>

<div class="modal-content">
<!--Your modal content goes here-->
</div>
</div>
</body>
```
**STEP3: 嵌入jQuery库和插件JS，注意必须在你的HTML内容底部。**
```html
<body>
<!--你的HTML内容-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="yourPath/animatedModal.min.js"></script>
</body>
```
**STEP4: 初始化**
```html
<script>
$("#demo01").animatedModal();
</script>
```
提示：下载的DMEO页面如果看不到效果，请检查的你浏览器，还有就是jQuery库的嵌入地址加上http:

官方下载 &amp; 演示：[http://joaopereirawd.github.io/animatedModal.js/](http://joaopereirawd.github.io/animatedModal.js/)