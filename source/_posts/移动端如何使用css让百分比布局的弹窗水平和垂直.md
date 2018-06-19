---
title: 移动端如何使用css让百分比布局的弹窗水平和垂直方向上居中
tags:
  - 移动端垂直居中
id: 1078
categories:
  - 移动前端
date: 2015-07-31 20:38:24
---

&emsp;&emsp;pc端让一个弹窗水平和垂直方向居中，在知道弹窗宽高的情况下很好计算，只需要用如下css即可：
```css
#date{   
    width: 300px;  
    height: 300px;
    position: absolute;   
    top: 50%;   
    left: 50%;   
    margin-left: -150px;   
    margin-top: -150px;
}
```
&emsp;&emsp;但是到了移动端，如果写百分比布局的话，高度不好确定，所以弹窗居中就会变得困难，今天遇到这个问题，百度了一下，看到这位朋友的资料，这位朋友的css代码如下：
```css
.center{   
    width:50%;   
    height:30%;   
    position: absolute;   
    top: 50%;   
    left: 50%;   
    -moz-transform: translate(-50%, -50%);  
    -ms-transform: translate(-50%, -50%);   
    -webkit-transform: translate(-50%, -50%);   
    transform: translate(-50%, -50%);
}
```
试了一下，可以得到想要的效果，

&emsp;&emsp;但是如果我们在不确定高度的情况下，把height：30%去掉，不设置height的值，会发现弹窗会根据自己的内容来实现垂直方向居中，主要css代码如下：
```css
.center{   
    width:50%;   
    position: absolute;   
    top: 50%;   
    left: 50%;   
    -moz-transform: translate(-50%, -50%);  
    -ms-transform: translate(-50%, -50%);   
    -webkit-transform: translate(-50%, -50%);   
    transform: translate(-50%, -50%);
}
```
效果如下(弹窗部分为灰色背景区域)：

[![0](http://www.npm8.com/wp-content/uploads/2015/07/0.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/0.jpg)

&emsp;&emsp;这样就可以很好的得到自己想要的，水平和垂直方向上都居中的弹窗效果拉，大家可以试下~
&nbsp;