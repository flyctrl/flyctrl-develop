---
title: HTML5 postMessage解决跨域、跨窗口消息传递
tags:
  - iframe跨域
  - postMessage
  - postMessage跨域
  - 跨窗口消息传递
id: 2560
categories:
  - JS/Jq
date: 2017-01-14 22:26:28
---

平时做web开发的时候关于消息传递，除了客户端与服务器传值还有几个经常会遇到的问题
>1.页面和其打开的新窗口的数据传递

>2.多窗口之间消息传递

>3.页面与嵌套的iframe消息传递

>4.上面三个问题的跨域数据传递

## postMessage()

这些问题都有一些解决办法，但html5引入的message的API可以更方便、有效、安全的解决这些难题。postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。

## postMessage(data,origin)方法接受两个参数

1.data:要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候需要使用JSON.stringify()方法对对象参数序列化，在低版本IE中引用json2.js可以实现类似效果。
2.origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以建参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。
http://test.com/index.html
```html
<div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">
<div id="color">Frame Color</div>
</div>
<div>
<iframe id="child" src="http://lsLib.com/lsLib.html"></iframe>
</div>
```
我们可以在http://test.com/index.html通过postMessage()方法向跨域的iframe页面http://lsLib.com/lsLib.html传递消息
```javascript
window.onload=function(){
   window.frames[0].postMessage('getcolor','http://lslib.com');
}
```

## 接收消息

test.com上面的页面向lslib.com发送了消息，那么在lslib.com页面上如何接收消息呢，监听window的message事件就可以
http://lslib.com/lslib.html
```javascript
window.addEventListener('message',function(e){
    if(e.source!=window.parent) return;
    var color=container.style.backgroundColor;
    window.parent.postMessage(color,'*');
},false);
```
这样我们就可以接收任何窗口传递来的消息了，为了安全起见，我们利用这时候的MessageEvent对象判断了一下消息源,MessageEvent是一个这样的东东

![watch](http://www.npm8.com/wp-content/uploads/2017/01/wathc.png)

**有几个重要属性**
data：顾名思义，是传递来的message

source：发送消息的窗口对象

origin：发送消息窗口的源（协议+主机+端口号）

这样就可以接收跨域的消息了，我们还可以发送消息回去，方法类似

## 简单的demo

在这个例子中，左边的div会根据右边iframe内div颜色变化而变化

![framecolor1](http://www.npm8.com/wp-content/uploads/2017/01/framecolor1-660x187.png)

![framecolor2](http://www.npm8.com/wp-content/uploads/2017/01/framecolor2-660x208.png)

http://test.com/index.html
```html
<!DOCTYPE html>
<html>
<head>
<title>Post Message</title>
</head>
<body>
<div style="width:200px; float:left; margin-right:200px;border:solid 1px #333;">
<div id="color">Frame Color</div>
</div>
<div>
<iframe id="child" src="http://lsLib.com/lsLib.html"></iframe>
</div>

<script type="text/javascript">

window.onload=function(){
window.frames[0].postMessage('getcolor','http://lslib.com');
}

window.addEventListener('message',function(e){
var color=e.data;
document.getElementById('color').style.backgroundColor=color;
},false);
</script>
</body>
</html>
```
http://lslib.com/lslib.html
```html
<!doctype html>
<html>
<head>
<style type="text/css">
html,body{
height:100%;
margin:0px;
}
</style>
</head>
<body style="height:100%;">
<div id="container" onclick="changeColor();" style="widht:100%; height:100%; background-color:rgb(204, 102, 0);">
click to change color
</div>
<script type="text/javascript">
var container=document.getElementById('container');

window.addEventListener('message',function(e){
if(e.source!=window.parent) return;
var color=container.style.backgroundColor;
window.parent.postMessage(color,'*');
},false);

function changeColor () {
var color=container.style.backgroundColor;
if(color=='rgb(204, 102, 0)'){
color='rgb(204, 204, 0)';
}else{
color='rgb(204,102,0)';
}
container.style.backgroundColor=color;
window.parent.postMessage(color,'*');
}
</script>
</body>
</html>
```
在例子中页面加载的时候主页面向iframe发送’getColor‘ 请求（参数没实际用处）
```javascript
window.onload=function(){
     window.frames[0].postMessage('getcolor','http://lslib.com');
}
```
iframe接收消息，并把当前颜色发送给主页面呢
```javascript
window.addEventListener('message',function(e){
    if(e.source!=window.parent) return;
    var color=container.style.backgroundColor;
    window.parent.postMessage(color,'*');
},false);
```
主页面接收消息，更改自己div颜色
```javascript
window.addEventListener('message',function(e){
      var color=e.data;
      document.getElementById('color').style.backgroundColor=color;
},false);
```
当点击iframe事触发其变色方法，把最新颜色发送给主页面
```javascript
function changeColor () {            
       var color=container.style.backgroundColor;
       if(color=='rgb(204, 102, 0)'){
            color='rgb(204, 204, 0)';
       }else{
            color='rgb(204,102,0)';
       }
       container.style.backgroundColor=color;
       window.parent.postMessage(color,'*');
}
```
主页面还是利用刚才监听message事件的程序处理自身变色
```javascript
window.addEventListener('message',function(e){
      var color=e.data;
      document.getElementById('color').style.backgroundColor=color;
},false);
```

## 最后

很简单的用法却解决了大问题，据说Facebook已经在使用了，而且这也是html5另一个API——web workers传递消息的方法，那么它的浏览器兼容性怎么样呢？所谓浏览器兼容性几乎变成了IE几开始支持的问题了。。。不过好消息是跟localStorage一样，IE8+都支持了，只不过有些浏览器的低版本（比如FireFox4.0）并不支持window.onmessage=function(){}这种写法，所以我么最好使用事件绑定的写法，为了兼容IE，也要判断是否支持addEventListener。