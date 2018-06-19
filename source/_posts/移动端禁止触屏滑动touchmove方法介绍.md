---
title: 移动端禁止触屏滑动touchmove方法介绍
tags:
  - 移动端禁止滑动
  - 移动端禁止触屏滑动touchmove
id: 2004
categories:
  - 移动前端
date: 2015-12-28 15:22:48
---

&emsp;&emsp;在移动端页面开发中，有时需要禁止用户滑动屏幕，搜索了好久才找到移动终端的touch事件，touchstar,touchmove,touchend.

**阻止滚动**

&emsp;&emsp;一些移动设备有缺省的touchmove行为，比如说经典的iOS overscroll效果，当滚动超出了内容的界限时就引发视图反弹。这种做法在许多多点触控应用中会带来混乱，但要禁用它很容易。
```javascript
document.body.addEventListener('touchmove', function(event) { 
event.preventDefault(); 
}, false);
```
&emsp;&emsp;在PC端页面开发中，可以设置onmousewheel，其实在大多数浏览器（IE6, IE7, IE8, Opera 10+, Safari 5+）中，都提供了 “mousewheel” 事件。但杯具的是 Firefox 3.5+ 却不支持此事件，不过庆幸 Firefox 3.5+ 中提供了另外一个等同的事件：”DOMMouseScroll” （事件和事件属性的测试案例）。
```javascript
var addEvent = (function(){
if (window.addEventListener) {
return function(el, sType, fn, capture) {
el.addEventListener(sType, fn, (capture));
};
} else if (window.attachEvent) {
return function(el, sType, fn, capture) {
el.attachEvent("on" + sType, fn);
};
} else {
return function(){};
}
})(),
stopEvent: function(event) {
if (event.stopPropagation) {
event.stopPropagation();
} else {
event.cancelBubble = true;
}
if (event.preventDefault) {
event.preventDefault();
} else {
event.returnValue = false;
}
},
zoomIn = function(){},
zoomOut = function(){},
// isFirefox 是伪代码，大家可以自行实现
mousewheel = isFirefox ? "DOMMouseScroll" : "mousewheel";
// object 是伪代码，你需要注册 Mousewheel 事件的元素
addEvent(object, mousewheel, function(event){
var delta = 0;
event = window.event || event;
stopEvent(event);
delta = event.wheelDelta ? (event.wheelDelta / 120) : (- event.detail / 3);
// zoomIn, zoomOut 是伪代码，需要实现的缩放事件
delta > 0 ? zoomIn(delta): zoomOut(Math.abs(delta));
} , false);
```