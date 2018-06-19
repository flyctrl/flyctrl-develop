---
title: JavaScript获取URL资源详解
tags:
  - JavaScript获取URL
id: 1579
categories:
  - JS/Jq
date: 2015-09-10 10:32:01
---

URL即统一资源定位符 (Uniform Resource Locator, URL)，完整的URL由这几个部分构成：
scheme://host:port/path?query#fragment

scheme:通信协议，常用的http,ftp,maito等。

host:主机，服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。

port:端口号，整数，可选，省略时使用方案的默认端口，如http的默认端口为80，https的默认端口是443。

path:路径，由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。

query:查询，可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&amp;"符号隔开，每个参数的名和值用"="符号隔开。

fragment:信息片断，字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点)这个标志点不是统一资源标志符的一部分，而是让用户浏览器在获得了文件后来导航用的，因此它实际上不被送到服务器。

![](http://www.npm8.com/wp-content/uploads/2015/09/121.jpg)

下面我们举例一个URL，然后获得它的各个组成部分。
http://bbs.grycheng.com/forum.php?gid=42

***
window.location.href 可以获得整个URL字符串（在浏览器中就是完整的地址栏）。

var test = window.location.href;

alert(test);

程序返回http://bbs.grycheng.com/forum.php?gid=42

***
window.location.protocol 可以获得 URL 的协议部分

var test = window.location.protocol;

alert(test);

程序返回 http:

***
window.location.host 可以获得 URL 的主机部分

var test = window.location.host;

alert(test);

程序返回 bbs.aseoe.com

***
window.location.port 可以获得 URL 的端口部分

var test = window.location.port;

alert(test);

如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符。
***
window.location.pathname 获得 URL 的路径部分（就是文件地址）

var test = window.location.pathname;

alert(test);
***
window.location.search 

获得查询（参数）部分，除了给动态语言赋值以外，我们同样可以给静态页面，并使用javascript来获得相信应的参数值。

var test = window.location.search;

alert(test);

***
window.location.hash 获得锚点。

var test = window.location.hash;

alert(test);