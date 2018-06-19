---
title: js跳转到指定页面代码
tags:
  - js跳转页面
id: 1115
categories:
  - JS/Jq
date: 2015-08-05 11:39:41
---

js中跳转页面方法有很多不同种的跳转方法会针对不同的页面或不同的浏览器了，在这里整理的这些都是我们常用的，有需要的可进入参考。

第一种：location.href最简单的跳转代码，直跳到指定页面了
```javascript
window.location.href="login.jsp?backurl="+window.location.href;
```
我们也可以这样写
```javascript
window.location="login.jsp?backurl="+window.location.href;
```
代码的效果是完全一样的
&nbsp;
第二种：这种不算跳转了，是返回上一级页面了，如果没有上一级页面是没有任何操作的哦
```javascript
alert("返回");
window.history.back(-1);
```
&nbsp;
第三种：window.navigate

只能用在IE浏览器了，所以现在几乎都没人使用它了，算是一个垃圾功能了。
```javascript
window.navigate("www.111cn.net");
```
&nbsp;
第四种：这种是在框架页面调用是让自己当前框架页面刷亲了哦
```javascript
self.location='www.111cn.net';
```
&nbsp;
第五种：同样是适用于框架页面我们只是框架中的顶部页面跳转到这个页面
```javascript
alert("非法访问！");
top.location='www.111cn.net';
```
&nbsp;
**补充：**

1\. Javascript 返回上一页 history.go(-1), 返回两个页面: history.go(-2);

2\. history.back().

3\. window.history.forward()返回下一页

4\. window.history.go(返回第几页,也可以使用访问过的URL)

最后来给大家介绍一下 window.navigate 与 window.location.href 的区别吧
window.navigate 是只能用在IE浏览器中
window.location.href 而这个可以使用到所有浏览器哦。
&nbsp;