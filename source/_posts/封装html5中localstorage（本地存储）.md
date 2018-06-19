---
title: 封装HTML5中localStorage（本地存储）
tags:
  - localStorage
id: 2083
categories:
  - JS/Jq
date: 2016-01-12 21:22:20
---

&emsp;&emsp;localStorage，俗名本地存储，是一个只有5M大小的浏览器端存储工具，不过相比cookie的几K存储量来说，存储空间还算是提升了不少，这个东东在哪里看呢(⊙o⊙)?

打开浏览器—>F12—>直接上图吧！

上图：
[![localStorage](http://www.npm8.com/wp-content/uploads/2016/01/171123154484851-660x336.png)](http://www.npm8.com/wp-content/uploads/2016/01/171123154484851.png)
看吧，不是个很复杂的东西，很直观嘛，下面教大家如何使用，

### 第一步

算了，知道你们都是懒虫，我直接封装好了，copy吧：
```javascript
/*设置与获取Cookie*/
var Cookie ={}
Cookie.write = function(key, value, duration){
    var d = new Date();
    d.setTime(d.getTime()+1000*60*60*24*30);
        document.cookie = key + "=" + encodeURI(value) + "; expires=" + d.toGMTString();
};
Cookie.read = function(key){
    var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
    if(arr != null)
    return decodeURIComponent(arr[2]);
    return "";
};
//定义本地存储对象
var storage = {
 getItem:function(key){//假如浏览器支持本地存储则从localStorage里getItem，否则乖乖用Cookie
 return window.localStorage? localStorage.getItem(key): Cookie.read(key); 
 },
 setItem:function(key,val){//假如浏览器支持本地存储则调用localStorage，否则乖乖用Cookie
  if (window.localStorage) {
      localStorage.setItem(key,val); 
  } else {
   Cookie.write(key,val); 
  }
 }
 };
```
&emsp;&emsp;封装的比较简单，如果有更多需要可以自己再扩张一下，使用的话是蛮简单的，

### 举例：
```javascript
storage.setItem("UserName","侠名风大帅哥");//将UserName存进去
if(storage.getItem("UserName"))//假如存进去了
{
    console.log(storage.getItem("UserName"));//打印出来样子
}
```
### 注意事项：

&emsp;&emsp;因为localStorage存储进去的都是string类型，所以如果要存json记得`存前读后`做些处理
```javascript
var myJson={"UserName","侠名风大帅哥"};
storage.setItem("MyJson",JSON.stringify(myJson));//将myJson存进去，记得JSON.stringify转成字符串
var getmyJson=JSON.parse(storage.getItem("MyJson"));//取出来的是字符串，记得JSON.parse还原一下
```
### 结尾：
&emsp;&emsp;是不是觉得玩转localStorage如此轻松了，将来什么性能优化，减少与服务器的请求，用户历史行为记录等都可以通过它来完成，就看你能想到多少灵感了