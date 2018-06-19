---
title: pace.js页面加载进度条插件
tags:
  - pace.js
  - 页面加载进度条
id: 1807
categories:
  - 插件库
date: 2015-10-07 16:59:44
---

在页面中引入 Pace.js 和您所选择主题的 CSS 文件，就可以让你的页面拥有漂亮的加载进度和 Ajax 导航效果。不需要挂接到任何代码，自动检测进展。您可以选择颜色和多种效果，有简约，闪光灯，MAC OSX，左侧填充，顶部填充，计数器和弹跳等等。

本文简单介绍插件pace.js.

在页面中引入Pace.js，页面就会自动监测你的请求（包括Ajax请求），在事件循环滞后，会在页面记录加载的状态以及进度情况。此插件的兼容性很好，可以兼容IE8以上的所有主流插件，而且其强大之处在于，你还可以引入加载进度条的主题样式，你可以选择任意颜色和多种动画效果（例如简约、闪光灯，MAC OSX，左侧填充，顶部填充，计数器和弹跳等等动画效果），如果你擅长修改css动画，那你就可以做出无限种可能性的动画，为你的网站增添个性化特色！

[![201509290919291](http://www.npm8.com/wp-content/uploads/2015/10/201509290919291-660x266.png)](http://www.npm8.com/wp-content/uploads/2015/10/201509290919291.png)

调用方法：

引入Pace.js以及主题文件即可：
```html
<head>
<script src="/pace/pace.js"></script>
<link href="/pace/themes/pace-theme-barber-shop.css" rel="stylesheet" />
</head>
```
自定义配置：

Pace.js会自动加载到页面中，不需要挂接到任何代码，会自动检测进度。如果你想做一些调整，你可以设置window.paceOptions来自定义配置：

```javascript
paceOptions = {
// Disable the 'elements' source
elements: false,
// Only show the progress on regular and ajax-y page navigation,
// not every request
restartOnRequestAfter: false
}
```
你也可以将自定义设置放到script标签内，例如：
```html
<script data-pace-options='{ "ajax": false }' src='pace.js'></script>
```
如果你使用AMD或者Browserify来加载模块的话，你可以通过这样子来设置（例如：start）：
```javascript
define(['pace'], function(pace){
pace.start({
document: false
});
});
```
使用API：

Pace.js公开的API列表：

Pace.start：开始显示进度条，如果你不是使用AMD或者Browserify来加载模块的话，这个会默认执行。

Pace.restart：进度条重新加载以及显示。

Pace.stop：隐藏进度条以及停止加载。

Pace.track：监测一个或者多个请求任务。

Pace.ignore：忽略一个或者多个请求任务。

基本上大致使用方法就这些，还有其他的一些方法的使用，各位就前往到官网去查看更加详细的介绍。希望这个插件可以帮助到大家！

[查看官网](http://github.hubspot.com/pace/docs/welcome/)

[下载附件](https://github.com/HubSpot/PACE/archive/v0.5.6.zip)