---
title: JS获取服务器当前时间制作倒计时
tags:
  - JS获取服务器当前时间
id: 1892
categories:
  - JS/Jq
date: 2015-11-25 13:52:31
---

很多小伙伴做倒计时，会使用2个方式：

1、使用本地时间来进行倒计时，这个是最大的误区，如果用户改变了本地时间，那你这个倒计时的功能就是白搭了；

2、要求服务器返回一个服务器时间给到前端，然后前端根据服务器的时间进行倒计时，这个方式是最常用的方式，也是最普遍的方式，但这样就必须要前后端配合起来来开发了；

今天就给大家介绍一种，完全前端的方式，并且也是获取的服务器的时间方式；这样以后大家做倒计时，就不要去依赖后端人员返回时间给你了，一个方法完全搞定，那就是直接空请求当前的服务器。来说下原理吧，原理很简单：就是获取服务器返回的头部信息中的Date属性，但是这个得到的GMT(格林尼治时间) ，所以要转换一下为东八区的时间 ，这个就是响应服务器的当前时间，主要是处理客户端本地机器时间错误问题；本来是只想借助于jQuery来实现的，因为需要使用getResponseHeader的方法，但是奈何IE系列不兼容XMLHttpRequest，必须要先对XHR做一下兼容了，所以只能苦逼的使用原生来做了！

**HTML代码：**
```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset='UTF-8'/>
<title>JS获取服务器当前时间制作倒计时</title>
<script src="http://www.npm8.com/jquery.js"></script>
</head>
<body>
距到期<span id="end2">xx</span>天
</body>
</html>
```
&nbsp;

**JS代码：**
```javascript
function countday(){
    var day=0;
    var xhr=new XMLHttpRequest();
    if (!xhr) {
        xhr=new ActiveXObject("Mirosoft.XMLHTTP");
    };
    xhr.open('HEAD',location.href+'?r='+(new Date()).valueOf(),false);
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4 &amp;&amp; xhr.status==200) {
            var nowstr=new Date(xhr.getResponseHeader("Date"))+'';
            var date=new Date(Date.parse(nowstr.replace(/-/g,"/"))).getTime();
            var reg = /^\s*([1-9]\d{3})\-(\d{1,2})\-(\d{1,2})\s*$/;
            var _end1='2015-11-19';
            if (!reg.test(_end1)) 
            {
                throw new Error("Date Format Is Error !");
                return;
            }
            var end1 = new Date(_end1.replace(reg, "$1"), parseInt(_end1.replace(reg, "$2")) - 1, _end1.replace(reg, "$3"));
            day=Math.ceil((end1 - date)/(1000*60*60*24));
            if(day<1){
                window.location.href="http://www.baidu.com";
                return;
            };
        };
    }
    xhr.send(null);
    return day;
}
window.onload = function() 
{
    $('#end2').html(countday());
}
```