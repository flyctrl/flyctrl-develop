---
title: js跨浏览器常用事件
tags:
  - js跨浏览器事件
id: 1584
categories:
  - 前端兼容
date: 2015-09-10 10:38:13
---

//跨浏览器添加事件 
```javascript
function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + type, function() {
			fn.call(obj);
		});
	}
}
```
 &nbsp;
//跨浏览器移除事件
```javascript
function removeEvent(obj, type, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on' + type, fn);
	}
}
```
 &nbsp;
//跨浏览器阻止默认行为
```javascript
function preDef(evt) {
	var e = evt || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
```
 &nbsp;
//跨浏览器获取目标对象
```javascript
function getTarget(evt) {
	if (evt.target) { //W3C
		return evt.target;
	} else if (window.event.srcElement) { //IE
		return window.event.srcElement;
	}
}
```
 &nbsp;
//跨浏览器获取字符编码
```javascript
function getCharCode(evt) {
	var e = evt || window.event;
	if (typeof e.charCode == 'number') {
		return e.charCode;
	} else {
		return e.keyCode;
	}
}
```
&nbsp;