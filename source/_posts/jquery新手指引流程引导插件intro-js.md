---
title: jQuery新手指引流程引导插件Intro.Js
tags:
  - jq新手引导
  - jq新手指引流程
id: 924
categories:
  - 插件库
date: 2015-07-25 18:40:29
---

实用jQuery新手指引流程引导插件Intro.Js，不错的JS特效，一般用在新功能上线后，对用户的操作进行引导，也用在新手帮助方面，此JS插件支持键盘左右键切换引导，支持enter进入下一步，支持ESC取消引导，还是很不错的JS特效，使用方法也很简单。


设置参数：

设置多个格式 json格式：

key:value

可设置参数
```javascript
nextLabel: "Next &amp;rarr;",
prevLabel: "&amp;larr; Back",
skipLabel: "Skip",
doneLabel: "Done",
tooltipPosition: "bottom",
tooltipClass: "",
highlightClass: "",
exitOnEsc: !0,
exitOnOverlayClick: !0,
showStepNumbers: !0,
keyboardNavigation: !0,
showButtons: !0,
showBullets: !0,
showProgress: !1,
scrollToElement: !0,
overlayOpacity: 0.8,
positionPrecedence: ["bottom", "top", "right", "left"],
disableInteraction: !1
```

设置方法（多个参数设置）
```javascript
关键字：setOptions
```
```javascript
introJs().setOptions({'prevLabel':'&amp;larr; 上一步','nextLabel':'下一步 &amp;rarr;','skipLabel':'跳过','doneLabel':'完成'}).start();
```
设置方法(单个参数设置)
```javascript
关键字：setOption
```
```javascript
introJs().setOption("prevLabel","上一步").start();
```
页面分布引导的元素设置：
```html
<div id="demo" data-step="1" data-intro="这里是分布引导的内容……" data-position="right">
</div>
```
说明：

data-step：第几步

data-intro：分布引导的内容

data-position：引导内容显示位置，

参数：left,right,top,bottom(不解释)

[![newuser](http://www.npm8.com/wp-content/uploads/2015/07/newuser.png)](http://www.npm8.com/wp-content/uploads/2015/07/newuser.png)

[查看演示](http://demo.grycheng.com/case/Introjs/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/07/IntroJs.zip)
&nbsp;
&nbsp;