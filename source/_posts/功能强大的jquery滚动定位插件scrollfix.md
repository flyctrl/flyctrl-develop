---
title: 功能强大的Jquery滚动定位插件scrollFix
tags:
  - 滚动定位插件
  - 滚动定位插件scrollFix
id: 2543
categories:
  - 插件库
date: 2016-11-04 13:59:50
---

## 【插件功能】
当用户向上或向下滚动页面到一定位置时，目标元素开始固定定位（position:fixed），当回滚到原位置时目标元素恢复到原状态，可以定制触发滚动相对屏幕位置和触发滚动方向，兼容IE6

## 【原理】
通过监控滚动事件并控制层的绝对定位后的lef,top属性。

## 【插件参数】
```javascript
$(".target_element").scrollFix(
[ "top" | "bottom" | length(可以为负,表示相对bottom),
[ "top" | "bottom" ] ]
);
```
### 第一个参数：
可选，默认为"top"，当目标元素到了屏幕相对的位置时开始触发固定，可以填一个数值，如100,-200 ,负值表示相对于屏幕下方
### 第一个参数：
可选，默认为"top"，表示触发固定的滚动方向，"top"表示从上向下滚动时触发，"bottom"表示从下向上滚动时触发

[查看演示](http://demo.grycheng.com/case/scrollFixDemo/)

[点击下载](http://www.npm8.com/wp-content/uploads/2016/11/scrollFix.js)