---
title: js获取url参数值
tags:
  - url参数值
id: 137
categories:
  - JS/Jq
date: 2015-07-12 18:49:22
---

今天碰到要在一个页面获取另外一个页面url传过来的参数，一开始很本能的想到了用 split("?")这样一步步的分解出需要的参数。

后来想了一下，肯定会有更加简单的方法的！所以在网上找到了两个很又简单实用的方法，mark下

**方法一：正则分析法**
```javascript
function getQueryString(name) {
var reg = new RegExp("(^|&amp;)" + name + "=([^&amp;]*)(&amp;|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
}
```
这样调用：
```javascript
alert(GetQueryString("参数名1"));
alert(GetQueryString("参数名2"));
alert(GetQueryString("参数名3"));
```
**方法二：**

这样调用：
```javascript
<Script language="javascript">
var Request = new Object();
Request = GetRequest();
var 参数1,参数2,参数3,参数N;
参数1 = Request['参数1'];
参数2 = Request['参数2'];
参数3 = Request['参数3'];
参数N = Request['参数N'];
</Script>
```