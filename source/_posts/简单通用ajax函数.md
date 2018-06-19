---
title: 简单通用Ajax函数
tags:
  - Ajax函数
id: 63
categories:
  - JS/Jq
date: 2015-07-11 16:18:56
---

&emsp;&emsp;近日，总在纠结不懂Ajax原理，导致用JQuery做Ajax的时候，总是会碰到各种诡异的问题。身边的朋友也是一问三不知！
正所谓，我不入地狱，谁入地狱。我不学习，等特么谁学习。。
so~~看了1星期的Ajax历史、由来、原理等。。自己写了个通用源生javascript函数，希望能给大家一些启迪。
Over，小二，上码！
各位加油，理解万岁。
&nbsp;
```javascript
//一个简单的执行ajax的通用函数
//带一个参数，参数为对象，需要传送的东西，都在里面
function ajax(options){
//如果没有传入响应的值，就用默认的代替
options = {
//HTTP请求类型
type : options.type || "POST",
//请求的URL
url : options.url || "www.XXX.com/XXX.php?",
//请求的超时时间
timeout : options.timeout || 5000,
//请求失败、成功、完成
onComplete : options.onComplete || function(){alert(请求成功)},
onError : options.onError || function(){alert(请求失败)},
onSuccess : options.onSuccess || function(){alert(请求完成)},
//服务器返回的数据类型,用于判断服务器返回的数据。从而进行操作
date : options.date || " "
}

//创建XML对象
var xml = new XMLHttpRequest();
//初始化异步请求
xml.open(options.type,options.URL,ture);
//记录请求是否成功完成
var requestDone = false;
//初试一个回调函数，用于取消函数
setTimeout(function(){
requestDone = true;
},options.timeout);

//监听文档状态的更新
xml.onreadystatechange = function(){
//保持等待，知道数据加载完成,并保证请求未超时
if(xml.readyState == 4 && !requestDone){
//检查是否请求成功
if(httpSuccess(xml)){
//以服务器返回的数据作为参数调用成功回调函数
options.onSuccess(httpDate(xml,Date,options.type));
}else{
//否则就是发生了错误，执行Error
options.onError(); 
}
//调用完成回调函数
options.onComplete();
//避免内漏，清理文档
xml = null;
}
}

//建立与服务器的连接
xml.send();

//判断Http响应是否成功
function httpSuccess(r){
try{
//如果得不到服务器状态，且正在请求本地文件，则认为成功
return !r.status && location.protocolo = "file :" ||
//所有200到300的状态码都认为成功
(r.status > 200 && r.statys < 300) ||
//文档未被修改也算成功
r.statys == 304 ||
//safiri 在文档未被修改时返回空状态
navigator.userAgent.indexof("Safiri") >= 0 && typeof r.status == "undefind";
}catch(e){}
//若检查状态失败，则假设请求失败
return false;
}

//从 Http 响应中解析正确数据
function httpDate(r,type){
//获取 content-type 的首部
var ct = r.getResponseHeader("content-type");
//若没有提供默认类型，则判断服务器返回的是否是 xml 数据
var date = !type && ct && ct.indexof("xml") >= 0;
//若是，获取 xml 对象，否则返回文本内容
date = type == "xml" || date ? r.resposeXML : r.resposeText;
//若指定类型为 script ，则以 javascript 的形式执行返回文本
if(type == "script"){
eval.call(window,date); 
}
//返回响应数据(或为xml或为字符串)
return date;
} 
}
```