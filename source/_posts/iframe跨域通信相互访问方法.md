---
title: iframe跨域通信相互访问方法
tags:
  - iframe相互访问
  - iframe访问主框架
  - iframe跨域
  - iframe跨域通信
  - iframe通信
id: 2456
categories:
  - JS/Jq
date: 2016-08-03 23:37:11
---

## 1.同域相互访问

假设A.html 与 b.html domain都是localhost （同域）

A.html中iframe 嵌入 B.html，name=myframe

A.html有js function fMain()

B.html有js function fIframe()

**需要实现 A.html 调用 B.html 的 fIframe()，B.html 调用 A.html 的 fMain()**

**A.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> main window </title>
<script type="text/javascript">
// main js function
function fMain(){
alert('main function execute success');
}

// exec iframe function
function exec_iframe(){
window.myframe.fIframe();
}
</script>
</head>
<body>
<p>A.html main</p>
<p><input type="button" value="exec iframe function" onclick="exec_iframe()"></p>
<iframe src="B.html" name="myframe" width="500" height="100"></iframe>
</body>
</html>
```
**B.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> iframe window </title>
<script type="text/javascript">
// iframe js function
function fIframe(){
alert('iframe function execute success');
}

// exec main function
function exec_main(){
parent.fMain();
}

</script>
</head>
<body>
<p>B.html iframe</p>
<p><input type="button" value="exec main function" onclick="exec_main()"></p>
</body>
</html>
```
点击A.html 的 exec iframe function button，执行成功，弹出iframe function execute success。如下图

![1](http://www.npm8.com/wp-content/uploads/2016/08/1.png)

点击B.html 的 exec main function button，执行成功，弹出 main function execute success。如下图

![2](http://www.npm8.com/wp-content/uploads/2016/08/2.png)

## 2.跨域互相访问

假设A.html domain是 localhost，B.html domain 是 127.0.0.1 （跨域）

这里使用 localhost 与 127.0.0.1

只是方便测试，localhost与127.0.0.1已经不同一个域，因此执行效果是一样的。

实际使用时换成 www.domaina.com 与 www.domainb.com 即可。

A.html中iframe 嵌入 B.html，name=myframe

A.html有js function fMain()

B.html有js function fIframe()

需要实现 A.html 调用 B.html 的 fIframe()，B.html 调用
A.html 的 fMain() （跨域调用）


**如果使用上面同域的方法，浏览器判断A.html 与 B.html 不同域，会有错误提示。**
Uncaught SecurityError: Blocked a frame with origin "http://localhost" from accessing a frame with origin "http://127.0.0.1". Protocols, domains, and ports must match.

**实现原理：**

因为浏览器为了安全，禁止了不同域访问。因此只要调用与执行的双方是同域则可以相互访问。

首先，A.html 如何调用B.html的 fIframe方法 

1.在A.html 创建一个 iframe 

2.iframe的页面放在 B.html 同域下，命名为execB.html 

3.execB.html 里有调用B.html fIframe方法的js调用

```javascript
parent.window.myframe.fIframe(); // execute parent myframe fIframe function
``` 
这样A.html 就能通过 execB.html 调用 B.html 的 fIframe 方法了。 同理，B.html 需要调用A.html

fMain方法，需要在B.html 嵌入与A.html 同域的 execA.html execA.html 里有调用 A.html fMain 方法的js 调用

```javascript
parent.parent.fMain(); // execute main function
```
这样就能实现A.html与B.html跨域相互调用。
**A.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> main window </title>
<script type="text/javascript">

// main js function
function fMain(){
alert('main function execute success');
}

// exec iframe function
function exec_iframe(){
if(typeof(exec_obj)=='undefined'){
exec_obj = document.createElement('iframe');
exec_obj.name = 'tmp_frame';
exec_obj.src = 'http://127.0.0.1/execB.html';
exec_obj.style.display = 'none';
document.body.appendChild(exec_obj);
}else{
exec_obj.src = 'http://127.0.0.1/execB.html?' + Math.random();
}
}
</script>
</head>
<body>
<p>A.html main</p>
<p><input type="button" value="exec iframe function" onclick="exec_iframe()"></p>
<iframe src="http://127.0.0.1/B.html" name="myframe" width="500" height="100"></iframe>
</body>
</html>
```
**B.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> iframe window </title>
<script type="text/javascript">
// iframe js function
function fIframe(){
alert('iframe function execute success');
}

// exec main function
function exec_main(){
if(typeof(exec_obj)=='undefined'){
exec_obj = document.createElement('iframe');
exec_obj.name = 'tmp_frame';
exec_obj.src = 'http://localhost/execA.html';
exec_obj.style.display = 'none';
document.body.appendChild(exec_obj);
}else{
exec_obj.src = 'http://localhost/execA.html?' + Math.random();
}
}
</script>
</head>
<body>
<p>B.html iframe</p>
<p><input type="button" value="exec main function" onclick="exec_main()"></p>
</body>
</html>
```
**execA.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> exec main function </title>
</head>
<body>
<script type="text/javascript">
parent.parent.fMain(); // execute main function
</script>
</body>
</html>
```
**execB.html**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title> exec iframe function </title>
</head>
<body>
<script type="text/javascript">
parent.window.myframe.fIframe(); // execute parent myframe fIframe function
</script>
</body>
</html>
```
执行如下图：

![3](http://www.npm8.com/wp-content/uploads/2016/08/3.png)

![4](http://www.npm8.com/wp-content/uploads/2016/08/4.png)

[DEMO下载](http://www.npm8.com/wp-content/uploads/2016/08/iframe.zip)