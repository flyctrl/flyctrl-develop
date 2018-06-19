---
title: 通过navigator判断浏览器版本或者手机类型
tags:
  - navigator判断手机类型
  - navigator判断浏览器版本
id: 1812
categories:
  - JS/Jq
date: 2015-10-08 10:01:10
---

今天来谈谈浏览器navigator属性。

&emsp;&emsp;javascript 的navigator属性，不常用，但是用处也不少，主要用处是在做浏览器兼容的问题的时候，现在有的网站已经不兼容IE6，用户假如用IE6浏览网页的话，会提示浏览器升级等信息。或者判断是手机用户还是电脑用户，手机用户调整至手机网站，电脑用户之间跳转至电脑网页等等。

首先我们来谈谈navigator属性。

你可以在自己电脑上，用复制如下信息，运行一下，看看：
```javascript
var x = navigator;
document.write("CodeName=" + x.appCodeName);
document.write("<br/>");
document.write("MinorVersion=" + x.appMinorVersion);
document.write("<br/>");
document.write("Name=" + x.appName);
document.write("<br/>");
document.write("Version=" + x.appVersion);
document.write("<br/>");
document.write("CookieEnabled=" + x.cookieEnabled);
document.write("<br/>");
document.write("CPUClass=" + x.cpuClass);
document.write("<br/>");
document.write("OnLine=" + x.onLine);
document.write("<br/>");
document.write("Platform=" + x.platform);
document.write("<br/>");
document.write("UA=" + x.userAgent);
document.write("<br/>");
document.write("BrowserLanguage=" + x.browserLanguage);
document.write("<br/>");
document.write("SystemLanguage=" + x.systemLanguage);
document.write("<br/>");
document.write("UserLanguage=" + x.userLanguage);
```
我的电脑的运行结果如下：
```javascript
CodeName=Mozilla
MinorVersion=undefined
Name=Netscape
Version=5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36
CookieEnabled=true
CPUClass=undefined
OnLine=true
Platform=Win32
UA=Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36
BrowserLanguage=undefined
SystemLanguage=undefined
UserLanguage=undefined
```
对照一下即可一目了然。

根据上面的navigator属性，我们可以来判断浏览器版本了，下面我们一起来做一个例子：

页面在IE7一下，提示浏览器升级，其他浏览器正常浏览

可以写如下代码：
```javascript
if(window.ActiveXObject)
{
var browser=navigator.appName
var b_version=navigator.appVersion
var version=b_version.split(";");
var trim_Version=version[1].replace(/[ ]/g,"");
if(browser=="Microsoft Internet Explorer" &amp;&amp; trim_Version=="MSIE6.0" || trim_Version=="MSIE7.0" )
{
$(".ie7andie6").show();
$(".contentnone").hide();
}
}
```
html我们可以这么写：
```html
<div class="contentnone" style="margin-top:30px;text-align: center;font-size:18px;">各位亲们，大家好，我在IE8以上可以正常浏览啊！</div>

 <div class="ie7andie6 mod-main" style="display:none;">
 <div class="tip">
 <p>您使用的浏览器版本较低，建议您换用下面这些浏览器试试吧。</p>
 </div>
 <ul class="clr mod-browsers">
 <li><A class="chrome" href="http://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome</A> </li>
 <li><A class="ie" href="http://windows.microsoft.com/zh-cn/internet-explorer/ie-10-worldwide-languages" target="_blank">IE10</A> </li>
 <li><A class="ff" href="http://firefox.com.cn/" target="_blank">Firefox</A> </li>
 </ul>
 <div class="switch-pic"></div>
</div>
```
IE8及其别的版本就可以正常浏览了！

另外你也可以用这个方法来判断是手机端用户还是电脑用户：

代码如下：
```javascript
var a=navigator.userAgent;
if(a.indexOf("Android")!=-1 || a.indexOf("iPhone")!=-1 || a.indexOf("iPad")!=-1 ){

             //跳转到手机网站

    }
```
&nbsp;