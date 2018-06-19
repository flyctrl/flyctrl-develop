---
title: jQuery全屏手风琴效果
tags:
  - jQuery全屏手风琴效果
id: 1825
categories:
  - 插件库
date: 2015-10-08 11:19:49
---

![jQuery全屏手风琴效果](http://www.npm8.com/wp-content/uploads/2015/10/96737.jpg)

用法简介：
jQuery全屏手风琴效果。
文件引用：
```javascript
<script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
<script>
var Expand = function () {
 var tile = $('.strips__strip');
 var tileLink = $('.strips__strip > .strip__content');
 var tileText = tileLink.find('.strip__inner-text');
 var stripClose = $('.strip__close');
 var expanded = false;
 var open = function () {
 var tile = $(this).parent();
 if (!expanded) {
 tile.addClass('strips__strip--expanded');
 tileText.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
 stripClose.addClass('strip__close--show');
 stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
 expanded = true;
 }
 };
 var close = function () {
 if (expanded) {
 tile.removeClass('strips__strip--expanded');
 tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
 stripClose.removeClass('strip__close--show');
 stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)');
 expanded = false;
 }
 };
 var bindActions = function () {
 tileLink.on('click', open);
 stripClose.on('click', close);
 };
 var init = function () {
 bindActions();
 };
 return { init: init };
}();
Expand.init();
</script>
```
[查看演示](http://demo.grycheng.com/case/FullAccordion/)

[点击下载](http://www.npm8.com/wp-content/uploads/2015/10/FullAccordion.zip)