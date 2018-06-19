---
title: 移动端JS 触摸事件基础
tags:
  - 移动端触摸事件
id: 1273
categories:
  - 移动前端
date: 2015-08-26 09:46:17
---

## 一、手机上的触摸事件

**基本事件：**

touchstart //手指刚接触屏幕时触发

touchmove //手指在屏幕上移动时触发

touchend //手指从屏幕上移开时触发

下面这个比较少用：

touchcancel //触摸过程被系统取消时触发

每个事件都有以下列表，比如touchend的targetTouches当然是 0 咯：

touches //位于屏幕上的所有手指的列表

targetTouches //位于该元素上的所有手指的列表

changedTouches //涉及当前事件的所有手指的列表

每个事件有列表，每个列表还有以下属性：

其中坐标常用pageX,pageY：

pageX //相对于页面的 X 坐标

pageY //相对于页面的 Y 坐标

clientX //相对于视区的 X 坐标

clientY //相对于视区的 Y 坐标

screenX //相对于屏幕的 X 坐标

screenY //相对于屏幕的 Y 坐标

identifier // 当前触摸点的惟一编号

target //手指所触摸的 DOM 元素

**其他相关事件：**

event.preventDefault（） //阻止触摸时浏览器的缩放、滚动条滚动

var supportTouch = "createTouch" in document //判断是否支持触摸事件

## 二、示例

&emsp;&emsp;以下是获取不同类型滑动的代码具体做法，结合前人的思想，封装好了，可以借鉴学习：
```javascript
var touchFunc = function(obj,type,func) {
//滑动范围在5x5内则做点击处理，s是开始，e是结束
var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
var sTime = 0, eTime = 0;
type = type.toLowerCase();

obj.addEventListener("touchstart",function(){
sTime = new Date().getTime();
init.sx = event.targetTouches[0].pageX;
init.sy = event.targetTouches[0].pageY;
init.ex = init.sx;
init.ey = init.sy;
if(type.indexOf("start") != -1) func();
}, false);

obj.addEventListener("touchmove",function() {
event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
init.ex = event.targetTouches[0].pageX;
init.ey = event.targetTouches[0].pageY;
if(type.indexOf("move")!=-1) func();
}, false);

obj.addEventListener("touchend",function() {
var changeX = init.sx - init.ex;
var changeY = init.sy - init.ey;
if(Math.abs(changeX)>Math.abs(changeY)&amp;&amp;Math.abs(changeY)>init.y) {
//左右事件
if(changeX > 0) {
if(type.indexOf("left")!=-1) func();
}else{
if(type.indexOf("right")!=-1) func();
}
}
else if(Math.abs(changeY)>Math.abs(changeX)&amp;&amp;Math.abs(changeX)>init.x){
//上下事件
if(changeY > 0) {
if(type.indexOf("top")!=-1) func();
}else{
if(type.indexOf("down")!=-1) func();
}
}
else if(Math.abs(changeX) 300) {
if(type.indexOf("long")!=-1) func(); //长按
}
else {
if(type.indexOf("click")!=-1) func(); //当点击处理
}
}
if(type.indexOf("end")!=-1) func();
}, false);
};
```