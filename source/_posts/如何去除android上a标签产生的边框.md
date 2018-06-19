---
title: 如何去除android上a标签产生的边框
tags:
  - 去除Android中a的边框
id: 1519
categories:
  - 移动前端
date: 2015-09-06 22:56:48
---

&emsp;&emsp;在ios4+和android2+系统，当手指触摸屏幕a标签链接或按钮时，会产生不同的效果，对于ios点击元素的时候，就会出现一个半透明的灰色背景；对于android则出现红色的边框。对这2个系统自带的效果，这种体验的意义无非为了告知用户按钮已经点击到，带来的价值是好的。可惜带来了体验的同时，也带来了bug......

主要是在android手机的一个bug

&emsp;&emsp;使用css给模块设置了opacity:0，控制该模块隐藏，如果该模块包含a标签，其a标签在android手机是可以被触发的，而在iphone是不可以触发。

&emsp;&emsp;下图左图为模块一，当页面内容未加载完成时，显示该模块；右图为模块二，当页面内容完全加载成功后才显示该模块，模块二通过设置了完全透明使其隐藏在模块一的上一层级。

![1](http://www.npm8.com/wp-content/uploads/2015/09/11.jpg)

&emsp;&emsp;在android手机中，当处于模块一状态时，用户触摸到“查看按钮”，a标签的边框显示出来，这明显不是我们要想要的体验。

![2](http://www.npm8.com/wp-content/uploads/2015/09/21.jpg)

&emsp;&emsp;最后跟产品经理沟通后，针对android手机去除上图的按钮边框，那么如何去除android手机自带的按钮边框呢？

在搜索引擎中找到资料-webkit-tap-highlight-color可以去除边框，如下图：

[![](http://www.npm8.com/wp-content/uploads/2015/09/28122717-e4b8828ab30b45d8aa4a7a199cbcf6c1-650x252.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/28122717-e4b8828ab30b45d8aa4a7a199cbcf6c1.jpg)

**排除误解**

&emsp;&emsp;网络资料说这个属性只用于iOS(iPhone和iPad)，其实是错误的，android手机大部分也是支持的，只是显示效果不一样，移动开发并不成熟，更多的还需要大家去实践来辨别真伪- -

**-webkit-tap-highlight-color用法**

&emsp;&emsp;webkit内核的浏览器，当用户点击一个链接或者通过js定义的可点击元素的时候，会出现一个半透明的灰色背景或者红色的边框。

&emsp;&emsp;如果想要禁用高亮，可设置颜色的alpha值为0，也就是属性值的最后一位设置为0就可以去除背景或者边框。

**去除android链接触摸时产生边框的css代码**
```css
a,button,input{-webkit-tap-highlight-color:rgba(255,0,0,0);}
/* 1.去除android a/button/input标签被点击时产生的边框 2.去除ios a标签被点击时产生的半透明灰色背景 */
```