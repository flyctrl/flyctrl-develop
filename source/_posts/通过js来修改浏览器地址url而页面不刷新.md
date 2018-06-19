---
title: 通过JS修改浏览器地址(url)而页面不刷新
tags:
  - js修改url而页面不刷新
  - JS修改浏览器地址页面不刷新
id: 2531
categories:
  - JS/Jq
date: 2016-11-02 11:41:54
---

**history对象**：它提供了一些非常有用的方法和属性，让我们在历史记录中自由前进和后退。

基本流程：

![history](http://www.npm8.com/wp-content/uploads/2016/11/3-660x191.png)

## 一、历史记录概览

**1、前进与后退**
```javascript
window.history.back() //后退
window.history.forward() //前进
```
**2.移动到指定的历史记录点**
```javascript
window.history.go(-1) //相当于back(),后退一页
window.history.go(1) //相当于forward(),前进一页
```
**3.历史长度**
```javascript
window.history.length
```
下面才是我们这篇文章的重点，也是在HTML5中才引进的。

## 二、添加和修改历史记录条目

有两个方法：

**history.pushState()**：会改变referrer的值，而在你调用方法后创建的 XMLHttpRequest 对象会在 HTTP 请求头中使用这个值。referrer的值则是创建 XMLHttpRequest 对象时所处的窗口的URL。

**history.replaceState()**：会修改当前历史记录条目而并非创建新的条目

我们先来看一个完整的例子再来了解这两个方法
```html
<div id="aa"></div>
<button id="btn" onclick="update()">点击</button>

<script>
var i=0;
var box=document.getElementById("aa");
function update(){
var foo={id:i};
var newUrl="?page="+i;
history.pushState(foo,'title',newUrl);
box.innerHTML=location.href;
i++;;
}
window.addEventListener('popstate', function(event) {
updateState(event.state);
});

function updateState(data){
box.innerHTML = data.id;
}
</script>
```
效果如下：
![t_pushState](http://www.npm8.com/wp-content/uploads/2016/11/t_pushState.gif)

下面来具体看看两个方法

**1、history.pushState()**
语法：
```javascript
history.pushState(stateObject,title,url)
```
三个参数：一个状态对象、一个标题（现在会被忽略），一个可选的URL地址。

状态对象（state object）

&emsp;&emsp;一个JavaScript对象，与用`pushState`()方法创建的新历史记录条目关联。无论何时用户导航到新创建的状态，`popstate`事件都会被触发，并且事件对象的state属性都包含历史记录条目的状态对象的拷贝。

&emsp;&emsp;任何可序列化的对象都可以被当做状态对象。因为FireFox浏览器会把状态对象保存到用户的硬盘，这样它们就能在用户重启浏览器之后被还原，我们强行限制状态对象的大小为640k。如果你向`pushState`()方法传递了一个超过该限额的状态对象，该方法会抛出异常。如果你需要存储很大的数据，建议使用`sessionStorage`或`localStorage`。

&emsp;&emsp;标题（title）---FireFox浏览器目前会忽略该参数，虽然以后可能会用上。考虑到未来可能会对该方法进行修改，传一个空字符串会比较安全。或者，你也可以传入一个简短的标题，标明将要进入的状态。

&emsp;&emsp;地址（URL）---新的历史记录条目的地址。浏览器不会在调用`pushState`()方法后加载该地址，但之后，可能会试图加载，例如用户重启浏览器。新的URL不一定是绝对路径；如果是相对路径，它将以当前URL为基准；传入的URL与当前URL应该是同源的，否则，`pushState`()会抛出异常。该参数是可选的；不指定的话则为文档当前URL。

&emsp;&emsp;注意：pushState()方法永远不会触发hashchange事件，即便新的地址只变更了hash。

**popstate事件**

&emsp;&emsp;每当激活的历史记录发生变化时，都会触发`popstate`事件。如果被激活的历史记录条目是由`pushState`所创建，或是被`replaceState`方法影响到的`popstate`事件的状态属性将包含历史记录的状态对象的一个拷贝。

调用`history.pushState()`或者`history.replaceState()`不会触发`popstate`事件.

`popstate`事件只会在其他浏览器操作时触发, 比如点击后退按钮(或者在JavaScript中调用`history.back()`方法).
直接读取当前状态
```javascript
var currentState = history.state;
```