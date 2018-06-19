---
title: html5实现微信摇一摇功能
tags:
  - html5 微信摇一摇
id: 1699
categories:
  - HTML5/CSS3
date: 2015-09-18 17:55:35
---

在HTML5中，DeviceOrientation特性所提供的DeviceMotion事件封装了设备的运动传感器时间，通过改时间可以获取设备的运动状态、加速度等数据（另还有deviceOrientation事件提供了设备角度、朝向等信息）。
而通过DeviceMotion对设备运动状态的判断，则可以帮助我们在网页上就实现“摇一摇”的交互效果。

**运动事件监听**
```javascript
if (window.DeviceMotionEvent) {
window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
alert('你的手机太差了，买个新的吧。');
}
```
**获取加速度信息**

“摇一摇”的动作既“一定时间内设备了一定距离”，因此通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，即可进行设备是否有进行晃动的判断。而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
```javascript
function deviceMotionHandler(eventData) {
var acceleration = eventData.accelerationIncludingGravity;
var curTime = new Date().getTime();

if ((curTime - last_update) > 100) {
var diffTime = curTime - last_update;
last_update = curTime;
x = acceleration.x;
y = acceleration.y;
z = acceleration.z;
var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
var status = document.getElementById("status");

if (speed > SHAKE_THRESHOLD) {
doResult();
}
last_x = x;
last_y = y;
last_z = z;
}
}
```
效果如图所示：

[![8](http://www.npm8.com/wp-content/uploads/2015/09/82.jpg)](http://www.npm8.com/wp-content/uploads/2015/09/82.jpg)