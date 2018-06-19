---
title: 用原生态的JS实现类似JQuery的$(
tags:
  - JS 实现jq选择器
id: 1348
categories:
  - JS/Jq
date: 2015-08-26 21:49:11
---

&emsp;&emsp;之前有个一直做前端开发的朋友，问我一个问题，说去面试一家NB的公司，问一个看似很简单的问，一时却不知道如何实现，虽然对jquery使用的很多，其实如果没看过jQuery的源码，相信一时很多人都会尴尬，这里我简单的做个案例，便于大家参考，当然jQuery会写的比这个复杂很多，判断部分有很多内容，这里我只是把他简单化了，提供给不会的朋友参考思路。

首先一个页面上有这些元素
```html
<div id="iddv" class="myclass"> my name is allen zhang</div>
<div id="dv" class="dvcs">i was from guizhou province</div>
```
我们的目的是用原生态的JS实现类似于JQuery 的$("#id")、$("#id").size()功能

1\. 实现 $("#id") / $("#class") / $("div")
```javascript
$ = function (str) {
return new JQuery(str);
}
JQuery = function (str) {
if (str.indexOf("#") == 0)
this.dom = document.getElementById(str.substring(1));
else if (str.indexOf(".") == 0)
this.dom = getElementsByClassName(str);
else
this.dom = document.getElementsByTagName(str);
return this.dom;
}

function getElementsByClassName(str) {
var elements = document.getElementsByTagName('*');
if (!elements) {
for (var i = 0; i <= elements.length; i++) {
if (elements[i].className == str.substring(1)) {
return elements[i];
}
}
}
return "undefined";

}

$("#iddv"); //output: <div id="iddv" class="myclass">

$(".myclass"); //output: <div id="iddv" class="myclass">

$("div"); //[div#iddv.myclass, div#dv.dvcs]
```

2\. 为了实现  $("#id").size()，在上面的基础上改了一下，同过继承的方式来实现的，如果你对js的继承方式不大了解，可以在网上搜一下，并于更好的理解以下方式。
```javascript
$ = window.JQuery = function (str) {
return new JQuery.prototype.init(str);
}
JQuery.prototype = {
name: "JQuery",
version: "1.71",
init: function (str) {
if (str.indexOf("#") == 0) {
this.dom = document.getElementById(str.substring(1));
this.length = 1;
}
else if (str.indexOf(".") == 0) {
this.dom = getElementsByClassName(str.substring(1));
this.length = this.dom.length;
}
else {
this.dom = document.getElementsByTagName(str);
this.length = this.dom.length;
}
},
size: function () {
if (this.dom)
return this.length;
}
}

function getElementsByClassName(str) {
var elements = document.getElementsByTagName('*');
if (!elements) {
for (var i = 0; i <= elements.length; i++) {
if (elements[i].className == str.substring(1)) {
return elements[i];
}
}
}
return "undefined";
}

JQuery.prototype.init.prototype = JQuery.prototype;   // 这个地方很重要，通过原型链的方式，让$拥有size的方法，否则访问不到这个函数。

$("#iddv").size();  //output: 1

$(".myclass").size(); // output: 1

$("div").size(); // output:2
```
&nbsp;