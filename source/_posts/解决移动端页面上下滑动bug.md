---
title: 解决移动端页面上下滑动Bug
tags:
  - 手机端页面上下滑动
  - 手机端页面上下滑动Bug
  - 手机端页面上下滑动空隙
  - 移动端页面上下滑动
  - 移动端页面上下滑动Bug
  - 移动端页面上下滑动空隙
id: 2144
categories:
  - JS/Jq
date: 2016-03-08 15:06:31
---

继续上一篇文章移动web页面支持弹性滚动解决方案，其实这里面的demo有一个小小的bug，现在为大家解决此bug，直接上图吧，看来就明白了！

[![1](http://www.npm8.com/wp-content/uploads/2016/03/1.jpg)](http://www.npm8.com/wp-content/uploads/2016/03/1.jpg)

&emsp;&emsp;Bug描述：当页面向下滑动的时候，上面会有一片的微信盲区，以前也未特意的关注此方面，但是从用户体验方面看下值得去思考了，首先需要阻止document默认事件就ok了，但只阻止默认事件是不能满足，然后还需将某些需要touchmove的事件的元素阻止冒泡，关于此类事件的原理，在我曾经的博文中可以找到，直接在www.npm8.com的搜索栏里面搜索“事件冒泡”，虐过。。。。
```javascript
document.addEventListener('touchmove',function(event){
event.preventDefault();//阻止浏览器的默认事件
},false);

document.addEventListener('touchstart',function(event){
event.preventDefault();//阻止浏览器的默认事件 
},false);
```
&emsp;&emsp;这样，左右滑动可以完成了，但是触摸一个div的时候，页面不能上下滑动了，怎么办？
当touchmove的时候，实时改变window的scrolltop值？
这样会有原生的滑动效果吗？
问题已经解决了！
最终代码：
```javascript
var touchTarget,
    touchScreenX,
    touchScreenY,
    conditionParentUntilTrue,
    disableScroll;

conditionParentUntilTrue = function (element, condition) {
    var outcome;

    if (element === document.body) {
        return false;
    }

    outcome = condition(element);

    if (outcome) {
        return true;
    } else {
        return conditionParentUntilTrue(element.parentNode, condition);
    }
};

window.addEventListener('touchstart', function (e) {
    touchTarget = e.targetTouches[0].target;
    scrollMap = {}

    scrollMap.left = conditionParentUntilTrue(touchTarget, function (element) {
        return element.scrollLeft > 0;
    });

    scrollMap.top = conditionParentUntilTrue(touchTarget, function (element) {
        return element.scrollTop > 0;
    });

    scrollMap.right = conditionParentUntilTrue(touchTarget, function (element) {
        return element.scrollWidth > element.clientWidth &amp;&amp;
               element.scrollWidth - element.clientWidth > element.scrollLeft;
    });

    scrollMap.bottom =conditionParentUntilTrue(touchTarget, function (element) {
        return element.scrollHeight > element.clientHeight &amp;&amp;
               element.scrollHeight - element.clientHeight > element.scrollTop;
    });

    touchScreenX = e.targetTouches[0].screenX;
    touchScreenY = e.targetTouches[0].screenY;
    disableScroll = false;
});

window.addEventListener('touchmove', function (e) {
    var moveScreenX,
        moveScreenY;

    if (disableScroll) {
        e.preventDefault();
        return;
    }

    moveScreenX = e.targetTouches[0].screenX;
    moveScreenY = e.targetTouches[0].screenY;

    if (
        moveScreenX > touchScreenX &amp;&amp; scrollMap.left ||
        moveScreenY < touchScreenY &amp;&amp; scrollMap.bottom ||
        moveScreenX < touchScreenX &amp;&amp; scrollMap.right ||
        moveScreenY > touchScreenY &amp;&amp; scrollMap.top
    ) {
    } else {
        e.preventDefault();
        disableScroll = true;
    }
});
```