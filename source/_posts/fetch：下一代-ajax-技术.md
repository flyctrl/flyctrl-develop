---
title: Fetch：下一代 Ajax 技术
tags:
  - fetch
  - Fetch：下一代 Ajax 技术
id: 2068
categories:
  - JS/Jq
date: 2016-01-09 15:46:16
---

Ajax，2005年诞生的技术，至今已持续了 10 年。它是一种在客户端创建一个异步请求的技术，本质上它不算创新，是一组技术的组合。它的核心对象是 XMLHttpRequest。

**简单回顾下历史**

1996年，IE 中首先添加了 iframe 用来实现异步请求获取服务器内容
1998年，微软 Outlook 在客户端 script 中实现了 XMLHttp 对象
1999年，微软在 IE5 中添加了 XMLHTTP ActiveX 对象用来异步获取服务器内容，该对象直到 Edge 浏览器才废弃。其它浏览器陆续实现了类似的对象称为 XMLHttpReques。
2004年，Google Gmail 中大量使用 XMLHttpRequest
2005年，Google Map 中大量使用 XMLHttpRequest
2005年，Jesse James Garrett 发表了文章 " Ajax: A New Approach to Web Applications "，Ajax 诞生
2006年，XMLHttpRequest 被 W3C 采纳，最后更新时间是 2014年1月
使用步骤大概如下
```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
	// To do with xhr.response
};
xhr.onerror = function() {
	// Handling errors
};
xhr.send();
```
以上可以看出，XHR 使用 onXXX 处理，典型的 "事件模式"。

Fetch目前还不是 W3C 规范，由 whatag 负责出品。与 Ajax 不同的是，它的 API 不是事件机制，而采用了目前流行的 Promise 方式处理。我们知道 Promise 是已经正式发布的 ES6 的内容之一。
```javascript
fetch('doAct.action').then(function(res) {
    if (res.ok) {
        res.text().then(function(obj) {
            // Get the plain text
        })
    }
}, function(ex) {
    console.log(ex)
})
```
以上fetch 函数是全局的，目前最新的Firefox，Chrome，Opera 都已支持，详见

[![fetch](http://www.npm8.com/wp-content/uploads/2016/01/1-660x157.jpg)](http://www.npm8.com/wp-content/uploads/2016/01/1.jpg)

[![fetch](http://www.npm8.com/wp-content/uploads/2016/01/2-660x199.jpg)](http://www.npm8.com/wp-content/uploads/2016/01/2.jpg)

以上是一个最简单的请求，只要传一个参数 url 过去，默认为 get 请求，获取纯文本，fetch第二个参数可以进行很多配置，比如 POST 请求
```javascript
fetch("doAct.action", {
	method: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	body: "keyword=荣耀7i&amp;enc=utf-8&amp;pvid=0v3w1kii.bf1ela"
}).then(function(res) {
	if (res.ok) {
		// To do with res
	} else if (res.status == 401) {
		// To do with res
	}
}, function(e) {
	// Handling errors
});
```
如果返回的是 JSON， 如下
```javascript
fetch('doAct.action').then(function(res) {
    if (res.ok) {
        res.json().then(function(obj) {
            // Get the JSON
        })
    }
}, function(ex) {
    console.log(ex)
})
```
res 实际上该规范定义的 Response 对象，它有如下方法

arrayBuffer()

blob()

json()

text()

formData()