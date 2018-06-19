---
title: Js添加事件attachEvent和addEventListener的用法详解
tags:
  - addEventListener
  - attachEvent
  - attachEvent和addEventListener区别
  - attachEvent和addEventListener用法
id: 968
categories:
  - JS/Jq
date: 2015-07-26 15:16:58
---

attachEvent和addEventListener详解，开始了！

## 一、基础篇

**先介绍 attachEvent：**

attachEvent方法可以动态的为网页内的元素添加一个事件，通常你想为某个按扭添加一个单击事件时．你都会在按扭内写上onclick=事件名称，使用attachEvent则不必这样做．你把写好的事件准备好，在需要的时候给元素绑定上再执行．而且attachEvent支持为某个元素绑定多个事件．执行顺序是，后绑定的先执行。

那么我在什么时候使用该方法呢，当然在你需要时，不过如今的Web2.0追求的是分离式开发技术，也就是说你在网页内看不到一句JavaScript语句，却在该页中使用了大量JavaScript技术，这就是高手们所谓的分离式开发技术，让前端的显示和程序逻辑分离开来。

如果想删除事件请使用detachEvent
attachEvent方法只支持IE浏览器．与其功能相同的指令是addEventListener,该指令支持FF等浏览器，并且是W3C标准

具体请参看下面实例：

语法：Element.attachEvent(Etype,EventName)

返回值：[tag:return_value /]
参数Element:要为该元素动态添加一个事件。

Etype:指定事件类型．比如：onclick,onkeyup,onmousemove等。

EventName:指定事件名称．也就是你写好的函数。

**attachEvent实例:**
```html
<html>
<head>
<title>attachEvent方法使用实例</title>
</head>
<body>
<input id="a" type="button" value="点我" />注意该按扭没有任何事件<br/>
<input id="b" type="button" value="点我绑定事件" onclick="att_Event()" />点击该按扭为上面的按扭添加一个事件．
<center><h3>重点提示:你可以尝试多次点击绑定事件，最上面的那个按扭就会绑定多个事件．比如你点击三次绑定．你再点击最上面的按扭，他就会执行三次弹出框．这就是我说的attachEvent方法支持为某个元素绑定多个事件．当然在实际开发中，你可以根据实际情况，来为他绑定多个不同的事件！
<script language="javascript">
function att_Event(){
var a = document.getElementById("a");
a.value = "点我有事件";
a.attachEvent("onclick",Hello_ok);
}

function Hello_ok(){
alert("您好，欢迎来到grycheng的博客！本博客的发展离不开您的支持，谢谢您光临！");
}
</script>
</body>
</html>
```
**接下来：addEventListener**

addEventListener方法与attachEvent方法功能相同，但是addEventListener是W3C标准，而>attachEvent非W3C标准，且只支持IE浏览器。虽然addEventListener属于标准方法，但依然无法在IE下运行，IE不支持该方法。

addEventListener带有三个参数．必须设置，缺一不可。

addEventListener可以为网页内某个元素动态绑定一个事件．事件类型可随意指定．如:click,mousemove,keyup等。

通常你想为某个按扭添加一个单击事件时。你都会在按扭内写上onclick=事件名称，使用addEventListener则不必这样做。你把写好的事件准备好，在需要的时候给元素绑定上再执行。而且addEventListener支持为某个元素绑定多个事件，执行顺序是：先绑定的先执行。

那么我在什么时候使用该方法呢，当然在你需要时，不过如今的Web2.0追求的是分离式开发技术，也就是说你在网页内看不到一句JavaScript语句，却在该页中使用了大量JavaScript技术，这就是高手们所谓的分离式开发技术，让前端的显示和程序逻辑分离开来。

如果想删除事件请使用removeEventListener
经过我测试该方法支持FireFox(火狐浏览器)，不支持IE，具体请参看下面实例。

语法：Element.addEventListener(Etype,EventName,boole)

返回值：[tag:return_value /]

参数Element:要为该元素绑定一个事件，可以是任意的html元素。

Etype：事件类型，比如：click,keyup,mousemove，注意使用addEventListener绑定事件时，设置参数事件类型时不必写on，否则会出错。

EventName：要绑定事件的名称，也就是你写好的函数．

boole：该参数是一个布尔值，false或true必须填写，false代表支持浏览器事件捕获功能，true代表支持浏览事件冒泡功能。

```html
<html>
<head>
<title>addEventListener方法使用实例</title>
</head>
<body>
<input id="a" type="button" value="点我" />注意执行网页时该按扭并没有事件<br/>
<input id="b" type="button" value="点我绑定事件" onclick="add_Event()" />点击该按扭为上面的按扭绑定事件<br/>
<h3>注意该实例必须在FireFox(火狐浏览器下运行).你可以根据实际情况，来为他绑定多个不同的事件！addEventListener与<a href="http://hi.baidu.com/jiang_yy_jiang">attachevent</a>不一样的是，该方法不可以把同一事件绑定多次，但支持把不同的事件绑定到一个元素．请使用非IE浏览器测试该例。</h3>
<script language="javascript">
function add_Event(){
var a = document.getElementById("a");
a.value="点我有事件";
a.addEventListener("click",Hello_ok,false);
}

function Hello_ok(){
alert("您好！欢迎来到grycheng的博客！本博客的发展离不开您的支持，谢谢您光临！");
}
</script>
</body>
</html>
```
请注意说明哈！那个很重要，开发人员要注意细节！

看了上面的你在想，这两个方法浏览器不兼容，咋办，当然！老办法咯！！先判断是IE还是火狐嘛，这个简单看下面代码：
```javascript
<script type="text/javascript">
function att_Event() {
var a = document.getElementById("a");
a.value = "点我有事件";
if (document.all) {//IE
a.attachEvent("onclick", Hello_ok);
}
else {//FF,Chrome，Safari
a.addEventListener("click", Hello_ok, false);
}
}
function Hello_ok() {
alert("您好，我测试attachEvent时间方法！");
}
</script>
```

## 二、进阶篇

一般我们在JS中添加事件，是这样子的
```javascript
obj.onclick=method
```
这种绑定事件的方式，兼容主流浏览器,但如果一个元素上添加多次同一事件呢?
```javascript
obj.onclick=method1;
obj.onclick=method2;
obj.onclick=method3;
```
如果这样写,那么只有最后绑定的事件,这里是method3会被执行,这个时候我们就不能用onclick这样的写法了,主角改登场了,在IE中我们可以使用attachEvent方法
```javascript
//object.attachEvent(event,function);
btn1Obj.attachEvent("onclick",method1);
btn1Obj.attachEvent("onclick",method2);
btn1Obj.attachEvent("onclick",method3);
```
执行顺序为method1->method2->method3

做前端开发工程师,最悲剧的某过于浏览器兼容问题了,上面有两种添加事件的方法,为了同一添加事件的方法,我们不得不再重新写一个通用的添加事件函数,幸亏再有前人帮我们做了这件事

```javascript
function addEvent(elm, evType, fn, useCapture) {
if (elm.addEventListener) {
elm.addEventListener(evType, fn, useCapture);//DOM2.0
return true;
}
else if (elm.attachEvent) {
var r = elm.attachEvent(‘on‘ + evType, fn);//IE5+
return r;
}
else {
elm['on' + evType] = fn;//DOM 0
}
}
```
下面是Dean Edwards 的版本
```javascript
function addEvent(element, type, handler) {
//为每一个事件处理函数分派一个唯一的ID
if (!handler.$$guid) handler.$$guid = addEvent.guid++;
//为元素的事件类型创建一个哈希表
if (!element.events) element.events = {};
//为每一个"元素/事件"对创建一个事件处理程序的哈希表
var handlers = element.events[type];
if (!handlers) {
handlers = element.events[type] = {};
//存储存在的事件处理函数(如果有)
if (element["on" + type]) {
handlers[0] = element["on" + type];
}
}
//将事件处理函数存入哈希表
handlers[handler.$$guid] = handler;
//指派一个全局的事件处理函数来做所有的工作
element["on" + type] = handleEvent;
};
//用来创建唯一的ID的计数器
addEvent.guid = 1;
function removeEvent(element, type, handler) {
//从哈希表中删除事件处理函数
if (element.events &amp;&amp; element.events[type]) {
delete element.events[type][handler.$$guid];
}
};
function handleEvent(event) {
var returnValue = true;
//抓获事件对象(IE使用全局事件对象)
event = event || fixEvent(window.event);
//取得事件处理函数的哈希表的引用
var handlers = this.events[event.type];
//执行每一个处理函数
for (var i in handlers) {
this.$$handleEvent = handlers[i];
if (this.$$handleEvent(event) === false) {
returnValue = false;
}
}
return returnValue;
};
//为IE的事件对象添加一些“缺失的”函数
function fixEvent(event) {
//添加标准的W3C方法
event.preventDefault = fixEvent.preventDefault;
event.stopPropagation = fixEvent.stopPropagation;
return event;
};
fixEvent.preventDefault = function() {
this.returnValue = false;
};
fixEvent.stopPropagation = function() {
this.cancelBubble = true;
};
```
功能非常强悍，解决IE的this指向问题，event总是作为第一个参数传入，跨浏览器就更不在话下。

最后贡献一个HTML5工作组的版本：
```javascript
var addEvent=(function(){
if(document.addEventListener){
return function(el,type,fn){
if(el.length){
for(var i=0;i&amp;lt;el.length;i++){
addEvent(el[i],type,fn);
}
}else{
el.addEventListener(type,fn,false);
}
};
}else{
return function(el,type,fn){
if(el.length){
for(var i=0;i&amp;lt;el.length;i++){
addEvent(el[i],type,fn);
}
}else{
el.attachEvent(‘on‘+type,function(){
return fn.call(el,window.event);
});
}
};
}
})();
```
PS：IE的attachEvent和W3C标准的addEventListener绑定多个事件的执行顺序是不一样的！

&nbsp;