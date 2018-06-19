---
title: '检测设备平台、操作系统、方向 Javascript 库:Device.js'
tags:
  - Device.js
  - 操作系统
  - '方向 Javascript 库:Device.js'
  - 检测设备平台
id: 2152
categories:
  - 插件库
date: 2016-03-08 16:03:15
---

&emsp;&emsp;在 Web 项目中，有时候我们需要根据程序运行的环境采取特定操作。Device.js 是一个很小的JavaScript库，它简化了编写和平台，操作系统或浏览器相关的条件 CSS 或 JavaScript 代码。
Device.js 是一个可以让你检测设备的平台，操作系统和方向 JavaScript 库，它会自动在<html>标签添加一些设备平台，操作系统，方向相关的 CSS class，这样就能让你针对不同设备撰写不同的 CSS，并且还提供一些 Javascript 函数来判断设备。

[![device.js](http://www.npm8.com/wp-content/uploads/2016/03/a.jpg)](http://www.npm8.com/wp-content/uploads/2016/03/a.jpg)
&emsp;&emsp;Device.js 通过操作系统（比如 iOS，安卓，黑莓，Windows，Firefox OX），方向（横屏或者竖屏），类型（平板或者移动设备），如下面在 iPhone 上的浏览的时候在添加的 CSS Class：

[![device-js-css-class](http://www.npm8.com/wp-content/uploads/2016/03/device-js-css-class.png)](http://www.npm8.com/wp-content/uploads/2016/03/device-js-css-class.png)

## 支持的设备

* iOS: iPhone, iPod, iPad
* Android: Phones &amp; Tablets
* Blackberry: Phones &amp; Tablets
* Windows: Phones &amp; Tablets
* Firefox OS: Phones &amp; Tablets

## 如何使用

Device.js 使用非常简单，只需要在页面的 head 载入相关的 JS 库即可：
```html
<script src="device.js"></script>
```

### 生成的 CSS Class：

[![Device.js](http://www.npm8.com/wp-content/uploads/2016/03/b.jpg)](http://www.npm8.com/wp-content/uploads/2016/03/b.jpg)

### 相关的 Javascript 函数

[![相关的 Javascript 函数](http://www.npm8.com/wp-content/uploads/2016/03/c.jpg)](http://www.npm8.com/wp-content/uploads/2016/03/c.jpg)

## 实例：判断移动设备最佳方法 并实现跳转至手机版网页

STEP 1: 引入 JS 文件
```html
<script src=”device.min.js”></script>
```
STEP 2: 加入判断代码
```html
<script type=”text/javascript”>
if(device.mobile()){
window.location = “shouji.html”; //可以换成http地址
}
</script>
```
&emsp;&emsp;Device.js 方法有很多，若你想实现对某个设备的判断，则要使用device.mobile()。
以上方法判断手机端很实用的，尤其是电脑版网页和手机版网页分别用不同的网站域名时，使用该方法可以免去用户记2个域名烦恼！

&nbsp;

[查看演示](http://matthewhudson.me/projects/device.js)

[点击下载](https://github.com/matthewhudson/device.js)