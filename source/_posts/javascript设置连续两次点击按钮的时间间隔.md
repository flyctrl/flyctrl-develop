---
title: javascript设置连续两次点击按钮的时间间隔
tags:
  - js设置连续两次点击按钮的时间间隔
id: 1965
categories:
  - JS/Jq
date: 2015-12-18 10:28:41
---

在实际应用中，可能并不希望按钮联系被不间断的点击，所以要限定一定的时间间隔才能够再次点击按钮，下面就通过代码实例介绍一下如何实现此功能，代码如下:

HTML：
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="author" content="http://www.npm8.com/" />
<title>grycheng前端博客</title>
</head>
<body>
<div id="thediv">0</div>
<input type="button" id="bt" value="查看效果"/>
</body>
</html>
```
JavaScript：
```javascript
window.onload=function(){ 
  var odiv=document.getElementById("thediv"); 
  var obt=document.getElementById("bt"); 
  var count=0; 
  var flag=null; 
  function done(){ 
    if(count==0){ 
      clearInterval(flag); 
    }  
    else{ 
      count=count-1; 
    } 
  } 
  obt.onclick=function(){ 
    var val=parseInt(odiv.innerHTML); 
    if(count==0){ 
      odiv.innerHTML=val+1; 
      count=20; 
      flag=setInterval(done,1000); 
    } 
    else{ 
      alert("还需要"+(count)+"秒才能点击"); 
    } 
  } 
} 
```
以上代码实现了我们的要求，可以限制点击按钮的间隔时间，这一效果可以扩展到其他的功能中，比如限制发帖的间隔时间等等，下面就介绍一下它的实现过程。

**一.代码注释:**

1.window.onload=function(){}，规定文档内容完全加载完毕再去执行函数中的代码。

2.var odiv=document.getElementById("thediv")，获取div元素对象。

3.var obt=document.getElementById("bt")，获取按钮对象。

4.var count=0，声明一个变量并赋初值为0，它用来存储间隔时间。

5.var flag=null，声明一个变量并赋初值为null，此变量用来存储定时器函数的返回值。

6.function done(){}，此函数可以被定时器函数不断的调用，来对count进行递减。

7.if(count==0){clearInterval(flag);}，如果count==0，则停止定时器函数的执行。

8.else{count=count-1;}，如果不等于0，则进行减一操作。

9.obt.onclick=function(){}，为按钮注册点击事件处理函数。

10.var val=parseInt(odiv.innerHTML)，获取div中的内容，并转换为整数。

11.
```javascript
if(count==0){
odiv.innerHTML=val+1;
count=20;
flag=setInterval(done,1000);
}
```
如果count等于0话饿，那么就将div中的内容+1，并且将count设置为20，同时开机定时器函数的执行。

12.else{alert("还需要"+(count)+"秒才能点击");},如果count不等于零，那么弹出还差多长时间可以点击。