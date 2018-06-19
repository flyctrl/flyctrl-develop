---
title: 移动端Web开发如何处理横竖屏
tags:
  - 移动端处理横竖屏
id: 1394
categories:
  - 移动前端
date: 2015-08-28 13:05:30
---

```html
<!Doctype html>
<html>
<head>
<meta charset="utf-8">
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0;">
<title>横竖屏切换检测</title>
<style type="text/css">
.landscape body {
background-color: #ff0000;
}

.portrait body {
background-color: #00ffff;
}
</style>
<script type="text/javascript">
// window.orientation :这个属性给出了当前设备的屏幕方向，0表示竖屏，正负90表示横屏（向左与向右）模式
// onorientationchange : 在每次屏幕方向在横竖屏间切换后，就会触发这个window事件，用法与传统的事件类似
(function(){
var supportOrientation=(typeof window.orientation == "number" &amp;&amp; typeof window.onorientationchange == "object"); //判断浏览器是否支持orientation

var updateOrientation=function(){
if(supportOrientation){
updateOrientation=function(){
var orientation=window.orientation;
switch(orientation){
case 90:
case -90:
orientation="landscape"; //横屏
break;
default:
orientation="portrait"; //竖屏
}
document.body.parentNode.setAttribute("class",orientation);
};
}else{
updateOrientation=function(){ //如果当前浏览器不支持orientation，则使用最简单的方法（判断窗口的高宽）
var orientation=(window.innerWidth > window.innerHeight)? "landscape":"portrait";
document.body.parentNode.setAttribute("class",orientation);
};
}
updateOrientation();
};

var init=function(){
updateOrientation();
if(supportOrientation){
window.addEventListener("orientationchange",updateOrientation,false);
}else{
window.setInterval(updateOrientation,5000);
}
};
window.addEventListener("DOMContentLoaded",init,false);
})();
</script>
</head>
<body>
<div>
移动端Web开发如何处理横竖屏
</div>
</body>
</html>
```