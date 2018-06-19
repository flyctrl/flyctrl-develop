---
title: js实现跨域的方法总结
tags:
  - js实现跨域的方法
id: 1879
categories:
  - JS/Jq
date: 2015-10-27 11:16:22
---

由于同源策略的限制，XMLHttpRequest只允许请求当前源（包含域名、协议、端口）的资源。

json与jsonp的区别：

JSON是一种数据交换格式，而JSONP是一种依靠开发人员创造出的一种非官方跨域数据交互协议。

script标签经常被用来加载不同域下的资源，可以绕过同源策略。（有src属性的都可以获取异域文件）。

如果请求的这个远程数据本身就是一段可执行的js，那么这些js会被执行（相当于eval）。

&nbsp;

#### **方法一：**

利用script标签请求（`<script src="http://....jsp?callback=回调函数名"></script>`）
在使用script标签请求前，先进行回调函数的申明调用，
```html
<script>
function 回调函数名（data数据）{   。。。。 }
</script>
<script src="http://....jsp?callback=回调函数名"></script>
```

使用JSON来传递javascript对象是一种最简单的方式了，这样的跨域通讯方式称为JSONP。

远程服务器拼凑字符串：
回调函数名( {"name1":"data1","name2","data2"} )
这种以后台拼凑json数据，利用回调函数传参的形式返回给客户端
（可以直接调用相当于已经将获取的字符串进行eval了处理）
例如：
```javascript
function databack(data){ alert(data.name1) }

// 会输出显示"data1"
```

&nbsp;

#### **方法二：**

jquery实现异域加载方法更为简单(与ajax异步请求方式相同）
```javascript
$.ajax({
type : "get",
dataType:"json",
success : function(data){ alert(data.name1) };
})
```
或者简写形式
```javascript
var url = "http://.....jsp?callback=?"; // 在jquery中此处的callback值可以为任意，因为jquery进行处理后都是利用success回调函数进行数据的接受；
$.getJSON( url, function(data){ alert(data.name1) });
```

&nbsp;

#### **方法三：**

ajax跨域之服务端代理
在同源的后台设置一个代理程序（proxy.jsp...）;在服务器端与异域的服务器交互。

jquery前台传输数据：

例如：
```javascript
$.get(
'http://。。。.jsp',    // 代理程序地址
{
name1 : "data1",
name2 : "data2"
},
function(data){
if(data == 1) alert('发送成功！');
}
);
```

后台数据的处理 :
```javascript
String data1 = request.getParameter("name1");
........
// 此处的url为另一域下的地址并带有参数
String url = "http://.....com/.../sss.jsp?" +　"name1=" + data1+　"name2=" +data2;
// 跳转到另一个域进行数据的处理并返回json格式的数据
request.getRequestDispatcher(url).forward(request,response);
```

&nbsp;

#### **方法四：**

利用iframe标签的src属性，进行跨域的访问，将获取到的值存储到当前的iframe中，然后再

同一页面进行获取该iframe的body内的值。
```javascript
<body>
<div id="show"></div>
<iframe id="frame" style="display: none;"></iframe>
</body>
<script>
$("#frame").attr("src", "路径?time=" + new Date().getTime()).load(function(){
// 获取iframe标签的值并进行获取，显示到页面
$("#show").append("[data: " + $($("#frame").get(0).contentDocument).find("body").text()+ " ]");
});
</script>
```

&nbsp;

#### **方法五：**

HTML5中websocket可以进行跨域的访问;
创建一个websocket对象：

var ws = new WebSocket(url);

主要处理的事件类型有（onopen,onclose,onmessage,onerror）;

例如：
```javascript
ws.onopen = function(){
console.log("open")；
// 向后台发送数据
ws.send("open");
}
```
后台可以是java,php,nodejs等，对数据处理用时间onmessage事件对返回的值进行前端处理。
```javascript
ws.onmessage = function(eve){
console.log(eve.data);
}
```