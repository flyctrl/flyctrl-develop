---
title: javascript 常用函数
tags:
  - js常用函数
id: 1113
categories:
  - JS/Jq
date: 2015-08-04 22:45:50
---

//获取元素的样式值。

```javascript
function getStyle(elem, name) {
  if (elem.style[name]) {
    return elem.style[name];
  } else if (elem.currentStyle) {
    return elem.currentStyle[name];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    name = name.replace(/([A-Z])/g, ”-$1″);
    name = name.toLowerCase();
    var s = document.defaultView.getComputedStyle(elem,“”);
      return s && s.getPropertyValue(name);
    }
    else {
      return null
    }
  }
```
&nbsp;
//获取元素相对于这个页面的x和y坐标。
```javascript
function pageX(elem){ 
return elem.offsetParent?(elem.offsetLeft+pageX(elem.offsetParent)):elem.offsetLeft; 
} 
function pageY(elem){ 
return elem.offsetParent?(elem.offsetTop+pageY(elem.offsetParent)):elem.offsetTop; 
} 
```
&nbsp;
//获取元素相对于父元素的x和y坐标。 
```javascript
function parentX(elem){ 
return elem.parentNode==elem.offsetParent?elem.offsetLeft:pageX(elem)-pageX(elem.parentNode); 
} 
function parentY(elem){ 
return elem.parentNode==elem.offsetParent?elem.offsetTop:pageY(elem)-pageY(elem.parentNode); 
} 
```
&nbsp;
//获取使用css定位的元素的x和y坐标。
```javascript
function posX(elem){ 
return parseInt(getStyle(elem,”left”)); 
} 
function posY(elem){ 
return parseInt(getStyle(elem,”top”)); 
} 
```
&nbsp;
//设置元素位置。 
```javascript
function setX(elem,pos){ 
elem.style.left=pos+”px”; 
} 
function setY(elem,pos){ 
elem.style.top=pos+”px”; 
} 
```
&nbsp;
//增加元素X和y坐标。 
```javascript
function addX(elem,pos){ 
set(elem,(posX(elem)+pos)); 
} 
function addY(elem,pos){ 
set(elem,(posY(elem)+pos)); 
} 
```
//获取元素使用css控制大小的高度和宽度 
```javascript
function getHeight(elem){ 
return parseInt(getStyle(elem,”height”)); 
} 
function getWidth(elem){ 
return parseInt(getStyle(elem,”width”)); 
} 
```
&nbsp;
//获取元素可能，完整的高度和宽度 
```javascript
function getFullHeight(elem) {
  if (getStyle(elem, ”display”) != ”none”) {
    return getHeight(elem) || elem.offsetHeight;
  } else {
    var old = resetCss(elem, {
      display: ”block”,
      visibility: ”hidden”,
      position: ”absolute”
    });
    var h = elem.clientHeight || getHeight(elem);
    restoreCss(elem, old);
    return h;
  }
}

function getFullWidth(elem) {
  if (getStyle(elem, ”display”) != ”none”) {
    return getWidth(elem) || elem.offsetWidth;
  } else {
    var old = resetCss(elem, {
      display: ”block”,
      visibility: ”hidden”,
      position: ”absolute”
    });
    var w = elem.clientWidth || getWidth(elem);
    restoreCss(elem, old);
    return w;
  }
}
```
&nbsp;
//设置css，并保存旧的css
```javascript 
function resetCss(elem, prop) {
  var old = {};
  for (var i in prop) {
    old[i] = elem.style[i];
    elem.style[i] = prop[i];
  }
  return old;
}

function restoreCss(elem, prop) {
  for (var i in prop) {
    elem.style[i] = prop[i];
  }
} 
```
&nbsp;
//显示和隐藏 
```javascript
function show(elem){ 
elem.style.display=elem.$oldDisplay||” “; 
} 
function hide(elem){ 
var curDisplay=getStyle(elem,”display”); 
if(curDisplay!=”none”){ 
elem.$oldDisplay=curDisplay; 
elem.style.display=”none”; 
} 
} 
```
&nbsp;
//设置透明度 
```javascript
function setOpacity(elem,num){ 
if(elem.filters){ 
elem.style.filter=”alpha(opacity=”+num+”)”; 
}else{ 
elem.style.opacity=num/100; 
} 
} 
```
&nbsp;
//滑动 
```javascript
function slideDown(elem){ 
var h=getFullHeight(elem); 
elem.style.height=”0px”; 
show(elem); 
for(var i=0;i<=100;i+=5){ 
new function(){ 
var pos=i; 
setTimeout(function(){elem.style.height=(pos/100*h)+”px”;},(pos*10)); 
} 
} 
} 
```
&nbsp;
//渐变
```javascript
function fadeIn(elem) {
  show(elem);
  setOpacity(elem, 0);
  for (var i = 0; i <= 100; i += 5) {
    new function() {
      var pos = i;
      setTimeout(function() {
        setOpacity(elem, pos);
      }, (pos + 1) * 10);
    }
  }
}
```
//获取鼠标光标相对于整个页面的位置。 
```javascript
function getX(e){ 
e=e||window.event; 
return e.pageX||e.clientX+document.body.scrollLeft; 
} 
function getY(e){ 
e=e||window.event; 
return e.pageY||e.clientY+document.body.scrollTop; 
} 
```
&nbsp;
//获取鼠标光标相对于当前元素的位置。
```javascript
function getElementX(e){ 
return (e&&e.layerX)||window.event.offsetX; 
} 
function getElementY(e){ 
return (e&&e.layerY)||window.event.offsetY; 
} 
```
&nbsp;
//获取页面的高度和宽度 
```javascript
function getPageHeight(){ 
var de=document.documentElement; 
return document.body.scrollHeight||(de&&de.scrollHeight); 
} 
function getPageWidth(){ 
var de=document.documentElement; 
return document.body.scrollWidth||(de&&de.scrollWidth); 
} 
```
//获取滚动条的位置。 
```javascript
function scrollX(){ 
var de=document.documentElement; 
return self.pageXOffset||(de&&de.scrollLeft)||document.body.scrollLeft; 
} 
function scrollY(){ 
var de=document.documentElement; 
return self.pageYOffset||(de&&de.scrollTop)||document.body.scrollTop; 
} 
```
//获取视口的高度和宽度。 
```javascript
function windowHeight() { 
var de = document.documentElement; 
return self.innerHeight||(de && de.offsetHeight)||document.body.offsetHeight; 
} 
function windowWidth() { 
var de = document.documentElement; 
return self.innerWidth||( de && de.offsetWidth )||document.body.offsetWidth; 
}
```
&nbsp;