---
title: 原生JS首页进度加载动画
tags:
  - 原生JS首页进度加载动画
  - 首页进度加载
id: 2496
categories:
  - JS/Jq
date: 2016-09-14 16:06:47
---

&emsp;&emsp;本实例的实现原理比较简单，不过不是真正的按文件大小来显示加载进度的，只是在触发document.onreadystatechange事件时，根据document.readyState的状态来改变显示进度的。加载时间统计用了Windows对象的performance属性，它是专门用来来计算精确时间的方法，其实还有一种靠谱一点的方法，用XMLHttpRequest对象的实例的progress事件，如：

```javascript
var request = new XMLHttpRequest();
request.onprogress = function (e) {
if(e.lengthComputable){ //lengthComputable是指文件是否有大小，值为true、false
progress.innerHTML = Math.round(100* e.loaded/ e.total) + \'%\';
//loaded、total表示已经加载的大小和总大小
}
}
```
&emsp;&emsp;用以上方法实现起来也挺麻烦，而且也不能实现100%的真实加载进度，所以索性就假一点了，不用他了！
本实例还用到了document.styleSheets[0].insertRule()方法
关于CSS动画的实现，大家自己看代码吧，很简单的代码
下面是完整代码：
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>原生JS首页进度加载动画 - grycheng</title>
<script>
document.onreadystatechange = function () {
function $id(id){return document.getElementById(id)}
var width = 0,id,
preloader_line = $id('preloader_line').firstElementChild,
preloader = $id('preloader'),
preloader_center = $id('preloader_center'),
preloader_btn = $id('preloader_btn'),
preloader_loading = $id('preloader_loading');
if (document.readyState == "interactive") {
loading(1,110,50);
}
if (document.readyState == "complete") {
loading(5,120,16.7);
preloader_loading.id = 'preloader_loaded';
preloader_loading.innerHTML = 'Loading Complete'+'<br/>'+'Using: '+performance.now().toFixed(3)+' ms';
preloader_btn.innerHTML = 'E N T E R';
preloader_btn.style.borderBottom = '4px solid green';
preloader_btn.style.fontStyle = 'inherit';
preloader_btn.style.fontSize = '24px';
if(document.styleSheets[0].insertRule){
document.styleSheets[0].insertRule('#preloader_btn:hover{border-bottom: 4px solid green;border-radius: 60px;color: red;}',0);
}else{//兼容IE9以下
document.styleSheets[0].addRule('#preloader_btn:hover{border-bottom: 4px solid green;border-radius: 60px;color: red;}',0);
}
preloader_btn.onclick = function () {
var opacity = 1,id;
function hide(){
if(opacity<=0){
clearTimeout(id);
preloader.style.display = 'none';
document.body.style.overflow = 'auto';
return;
}
opacity -= 0.1;
preloader.style.opacity = opacity;
id = setTimeout(function(){
hide();
},50);
}
hide();
};
}
function loading(step,max,time){
if(width>=max){
clearTimeout(id);
if(max >= 120){
preloader_line.parentNode.style.display = 'none';
}
return;
}
width += step;
preloader_line.style.width = width+'px';
id = setTimeout(function(){
loading(step,max,time);
},time);
}
};
</script>
<style>
body{overflow:hidden}
#preloader{position:absolute;width:100%;height:100%;background-color:white;z-index:999}
#preloader_center{position:absolute;left:0;right:0;top:0;bottom:0;width:150px;height:75px;margin:auto}
#preloader_loading{position:absolute;left:0;right:0;top:45px;margin:auto;width:96px;height:30px}
#preloader_loaded{position:absolute;left:0;right:0;top:45px;margin:auto;font-size:12px;text-align:center;line-height:30px}
#preloader_loading span{position:absolute;width:10px;height:2px;top:0;bottom:0;margin:auto;background-color:#9b59b6;animation:loading 1.5s infinite ease-in-out}
#preloader_loading span:nth-child(2){left:12px;animation-delay:.1s}
#preloader_loading span:nth-child(3){left:24px;animation-delay:.2s}
#preloader_loading span:nth-child(4){left:36px;animation-delay:.3s}
#preloader_loading span:nth-child(5){left:48px;animation-delay:.4s}
#preloader_loading span:nth-child(6){left:50px;animation-delay:.5s}
#preloader_loading span:nth-child(7){left:62px;animation-delay:.6s}
#preloader_loading span:nth-child(8){left:74px;animation-delay:.7s}
#preloader_loading span:nth-child(9){left:86px;animation-delay:.8s}
@keyframes loading{0%{height:2px;background:#9b59b6}
15%{height:20px;background:#3498db}
50%{height:2px;background:#9b59b6}
100%{height:2px;background:#9b59b6}
}iframe{width:100%;height:1000px}
#preloader_btn{position:absolute;left:0;right:0;top:0;margin:auto;display:block;width:122px;height:40px;font-size:14px;text-align:center;line-height:40px;cursor:pointer;color:#9b59b6;font-style:italic;-webkit-transition:all .5s;-moz-transition:all .5s;-ms-transition:all .5s;-o-transition:all .5s;transition:all .5s}
#preloader_line{position:absolute;left:0;right:0;top:40px;margin:auto;width:120px;height:2px;border:1px solid green}
#preloader_line span{display:block;height:2px;width:0;background-color:green}
</style>
</head>
<body>
<div id="preloader">
<div id="preloader_center">
<span id="preloader_btn">Loading...</span>
<span id="preloader_line">
<span></span>
</span>
<div id="preloader_loading">
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
</div>
</div>
<iframe src="http://jd.com"></iframe>
</body>
</html>
```
[查看演示](http://demo.grycheng.com/case/lading.html)