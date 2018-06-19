---
title: javascript实现标签云
tags:
  - js标签云
id: 543
categories:
  - JS/Jq
date: 2015-07-16 22:48:35
---

这是一个效果图

[![1](http://www.npm8.com/wp-content/uploads/2015/07/116.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/116.jpg)

原理：随机取色，随机字体大小

实现：

1、随机方法：

```javascript
function rand(num){
return parseInt(Math.random()*num+1);
}
```

2、随机取色：

```javascript
function randomcolor(){
var str=Math.ceil(Math.random()*16777215).toString(16);
if(str.length<6){
str=“0”+str;
}
return str;
}
```

3、循环dom
```javascript
for (len = obj.length, i = len; i–;) {
  obj[i].style.left = rand(600) + ”px”;
  obj[i].style.top = rand(400) + ”px”;
  obj[i].className = “color” + rand(5);
  obj[i].style.zIndex = rand(5);
  obj[i].style.fontSize = rand(12) + 12 + ”px”;
  // obj[i].style.background=“#”+randomcolor();
  obj[i].style.color = “#” + randomcolor();
  obj[i].onmouseover = function() {
    this.style.background = “#” + randomcolor();
  }
  obj[i].onmouseout = function() {
    this.style.background = “none”;
  }
}
```

4、dom结构

```html
<div id=“wrap”>
<a href=“#”>web标准学习</a><a href=“#”>css</a>
<a href=“#”>javascript</a><a href=“#”>html5</a>
<a href=“#”>canvas</a><a href=“#”>video</a>
<a href=“#”>audio</a><a href=“#”>jQuery</a>
<a href=“#”>jQuerymobile</a><a href=“#”>flash</a>
<a href=“#”>firefox</a><a href=“#”>chrome</a>
<a href=“#”>opera</a><a href=“#”>IE9</a>
<a href=“#”>css3.0</a><a href=“#”>andriod</a>
<a href=“#”>apple</a><a href=“#”>google</a><a href=“#”>jobs</a>
</div>
```