---
title: 'JS:cookie(创建，读取，删除)'
tags:
  - js cookie
id: 576
categories:
  - JS/Jq
date: 2015-07-17 13:07:54
---

### **一、创建cookie**
```javascript
function setCookie(name, value, expires, path, domain, secure) {
var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
if (expires instanceof Date) {
cookieText += '; expires=' + expires;
}
if (path) {
cookieText += '; path=' + path;
}
if (domain) {
cookieText += '; domain=' + domain;
}
if (secure) {
cookieText += '; secure='+secure;
}
document.cookie = cookieText;
}
```
&nbsp;

### **二、获取cookie**
```javascript
function getCookie(name) {
var cookieName = encodeURIComponent(name) + '=';
var cookieStart = document.cookie.indexOf(cookieName);
var cookieValue = null;

if (cookieStart > -1) {
var cookieEnd = document.cookie.indexOf(';', cookieStart);
if (cookieEnd == -1) {
cookieEnd = document.cookie.length;
}
cookieValue = decodeURIComponent(
document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
}
return cookieValue;
}
```
&nbsp;

### **三、删除cookie**
```javascript
function unsetCookie(name) {
document.cookie = name + "= ; expires=" + new Date(0);
}
```
&nbsp;

### **四、失效天数，直接传一个天数即可**
```javascript
function setCookieDate(day) {
if (typeof day == 'number' &amp;&amp; day > 0) {
var date = new Date();
date.setDate(date.getDate() + day);
} else {
throw new Error('传递的day必须是一个天数，必须比0大');
}
return date;
}
```
&nbsp;

### **五、HTML5中提供了localStorage方法**
```javascript
//通过方法存储和获取
localStorage.setItem('name', '李炎恢');
alert(localStorage.getItem('name'));

//通过属性存储和获取
localStorage.book = '李炎恢';
alert(localStorage.book);

//删除存储
localStorage.removeItem('name');

```
&nbsp;

PS：是永久保存的，保存在缓存里，只有手工删除或者清理浏览器缓存方可失效。在容量上也有一些限制，主要看浏览器的差异，Firefox3+、IE8+、Opera为5M，，Chrome和Safari为2.5M。