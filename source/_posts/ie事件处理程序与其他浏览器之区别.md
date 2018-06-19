---
title: IE事件处理程序与其他浏览器之区别
tags:
  - IE事件处理
id: 646
categories:
  - 前端杂货
date: 2015-07-18 17:26:03
---

今天想跟大家讨论下关于IE与其他浏览器之间的事件绑定事件的一些差别，在现在的WEB端从事DOM操作的程序员应该要常常为各种各样的元素绑定各种事件，那你是否真的了解各浏览器之间的事件绑定原理呢，今天我就给大家来简单解析下。

其实现在很多开发人员都在使用Jquery等JS框架进行开发，当然对于事件绑定不会遇到太多的兼容性，因为框架本身已经解决了跨浏览器之间的事件绑定的兼容问题。框架使用好坏就像一把双刃剑，高效，兼容性强等等都是好的一面，坏的一面当然是让使用者对其行程了依赖性，丧失了很多机会去接触更加底层的东西。其实本人在前两年的工作期也是非常依赖框架带来的便捷，当然后面也遇到了各种各样的瓶颈，好在最后开始觉悟了，嘿嘿！好了废话了一堆，马上进入正题。

首先我们来说下最简单暴力的javascript事件绑定方法吧。
```javascript
var okBtn = document.getElementById("okBtn");
okBtn.onclick = function(){
    alert(this.id);   //"okBtn"
}
```
这个方法是全兼容的，所有浏览器都兼容的事件绑定方法，很多时候我们都会用到这个方法。虽然好用，但是这个方法仍然有弊端，因为这段代码他在运行前是不会指定事件处理程序的，因此这段代码必须在页面中处于那个ID为okBtn的按钮后面才行，假如这段代码还没被页面加载完的情况下，你点击这个按妞是不会有任何反应的，这样子的事件绑定对于很多产品需求而已是无法满足的。

所以介于这种情况下，javascript还有一种事件绑定方法。这也是我们接下来要讲的重点。在现代浏览器中（chrome,firefox...）支持这么一种事件绑定，通过**addEventListener()**来绑定事件，这个函数接受三个参数**（绑定的事件对象，事件处理的函数，布尔值）**，最后一个布尔值是表示是否想要在事件捕获阶段就触发函数，一般都是false,因为一般的**事件捕获**阶段是不希望就触发函数的，关于**事件捕获**不懂的同学我会在后续出一篇文章来解释，今天就不对此做太多说明。以上的代码可以改成如下方法：
```javascript
var okBtn = document.getElementById("okBtn");
okBtn.addEventListener("click",function(){
    alert(this.id);   //"okBtn"
},false);
```
但是**addEventListener()**方法不支持IE9（不包含IE9）以下的浏览器，说实在的IE9和IE9以后的版本对javascript增加了很多以前只有chrome,firefox才支持的方法，终于不再坑爹。

IE9以下的浏览器中有这么一个方法来绑定事件的。attachEvent()函数是用来绑定事件的，这个函数只需传入两个参数**（绑定的事件对象，事件处理的函数）**上面的方法支持IE的绑定代码如下：
```javascrpt
var okBtn = document.getElementById("okBtn");
okBtn.attachEvent("onclick",function(){
    alert(this.id);   //"okBtn"
});
```
在IE9以下的浏览器都要这么用这个方法绑定，其实今天要告诉大家的不是这个绑定方法的差别，IE最坑爹的事情是重复绑定事件后先后执行的顺序。

**除IE以外的浏览器重复绑定事件代码：**
```javascript
var okBtn = document.getElementById("okBtn");
okBtn.addEventListener("click",function(){
    alert(this.id);   //"okBtn"
},false);
okBtn.addEventListener("click",function(){
    alert("事件绑定2");   //""事件绑定2"
},false);
```
运行结果：先弹出了“**okBtn**”然后再弹出了“**事件绑定2**”

**IE浏览器重复绑定事件代码：**
```javascript
var okBtn = document.getElementById("okBtn");
okBtn.attachEvent("onclick",function(){
    alert(this.id);   //"okBtn"
});
okBtn.attachEvent("onclick",function(){
    alert("事件绑定2");   //""事件绑定2"
});
```
运行结果：先弹出了“**事件绑定2**”然后再弹出了“**okBtn**”

这么坑爹，这是为啥，说实在的我也不知道，这您要问微软为啥？重复绑定一个事件，**IE与其他浏览器执行先后不一致**，这个问题大家一定要牢记，在IE9以下的浏览器中执行顺序都是反着者的，因为IE9开始已经支持**addEventListener()**方法所以不会在有这个问题了。

今天要讲的基本已经结束了，IE与其他浏览器事件重复绑定后执行顺序的差异。最后把跨浏览器绑定事件代码总结下:
```javascript
var $event = {
    on : function(element,type,handler){
        if(element.addEventListener){//判断addEventListener函数方法是否存在
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){//判断attachEvent函数方法是否存在
            element.attachEvent("on" + type,handler);
        }
    }
}
```
调用方法：
```javascript
var okBtn = document.getElementById("okBtn");
$event.on(okBtn,"click",function(){
    alert("新方法");
});
```
经过封装后的方法在IE各版本与chrome,firefox下都兼容，大家可以测试一下。