---
title: js实现一些跨浏览器的兼容事件方法
tags:
  - js跨浏览器的兼容事件方法
id: 2526
categories:
  - JS/Jq
date: 2016-11-02 10:20:50
---

用JavaScript实现事件的绑定，移除，以及一些常用的事件属性的获取，时常要考虑到在不同浏览器下的兼容性，下面给出了一个跨浏览器的事件对象：
```javascript
var EventUtil = {
    on: function(element, type, handler) {/* 添加事件 */
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {//IE  注意：此时事件处理程序会在全局作用域中运行，因此用attachEvent绑定的事件，此时在事件处理函数里的this 等于window，使用时要注意
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    off: function(element, type, handler) {/* 移除事件 */
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getEvent: function(event) {/* 返回对event对象的引用 */
        return event ? event : window.event;
    },

    getTarget: function(event) {/* 返回事件的目标 */
        return event.target || event.srcElement;
    },

    preventDefault: function(event) { /* 取消事件的默认行为 */
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function(event) {/* 阻止事件冒泡 */
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    /* mouseover 和mouserout 这两个事件都会涉及把鼠标指针从一个元素的边界之内移动到另一个元素的边界之内。*/
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {//IE8 mouserout事件
            return event.toElement;
        } else if (event.fromElement) {//IE8 mouseover事件
            return event.fromElement;
        } else {
            return null;//其他事件
        }
    }
};
```
调用如下：

```javascript
EventUtil.on(document, "click", function(event){//为document元素绑定click事件
    event = EventUtil.getEvent(event);//获取event事件对象
    alert("Screen coordinates: " + event.screenX + "," + event.screenY);
});
```