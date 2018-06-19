---
title: 回归原生javascript，addEventListener 和 onclick 到底有什么不同？
tags:
  - ddEventListener 和 onclick 有什么不同
  - ddEventListener 和 onclick 的区别
id: 2030
categories:
  - JS/Jq
date: 2016-01-07 22:11:09
---

## 前景
&emsp;&emsp;用习惯了JQ，对JQ的事件绑定和处理，相信大家已经是不陌生了，或许大家已经把原js生都抛之脑后了吧，不管是用什么框架，都是离不开原生js，所以建议大家还是对原生的多一些研究比较好！

## 问题描述
```javascript
var h = document.getElementById("a");
h.onclick = dothing1;
h.addEventListener("click", dothing2);
```
代码同时保存在一个分离的 .js 文件里面，而且它们都能完美地运行。

## 最佳答案
&emsp;&emsp;它们都是正确的，它们之间没有哪个是“最好的”，而且开发者有可能同时使用这两个方法。

&emsp;&emsp;**事件监听器(Event Listeners，包括 addEventListener 以及 IE 的 attacheEvent)**
旧版本的 IE 在执行 Javascript 时与几乎所有其它浏览器不同，在 IE 9 之前的版本中，你需要使用attachEvent模块，就像这样：
```javascript
element.attachEvent('onclick', function() { /* do stuff here*/ });
```
&emsp;&emsp;在大部分其它浏览器（包括 IE 9 以及更新的版本）中，你可以使用 <span style="color: #ff6600;">addEventListener</span>，就像这样：
```javascript
element.addEventListener('click', function() { /* do stuff here*/ }, false);
```
&emsp;&emsp;使用这些方法（DOM2 事件），理论上你可以向某个元素加入无数的事件。但实际上，这会受限于客户端的内存容量以及其它的性能问题，而这对于每一个浏览器都是不同的。
```javascript
var myFunctionReference = function(){ /* do stuff here */ }
element.attachEvent('onclick', myFunctionReference);
element.addEventListener('click', myFUnctionReference, false);
```
&emsp;&emsp;addEventListener还有一个特点就是最后的参数，它会控制监听器在事件冒泡阶段时就作出反应。有大约 95% 的可能会像我在例子中那样使用 false。这个参数在 attachEvent 中或在使用内联事件(inline Events) 时没有等效的参数。

**内联事件 (Inline Events, 即 HTML 中的 onclick="" 属性 和 element.onclick)**
在所有支持 Javascript 的浏览器中，你可以将一个事件监听器内联，也就是像下面的 HTML 代码那样：
```html
<a id="testing" href="#" onclick="alert('did stuff inline');">Click me</a>
```
&emsp;&emsp;虽然它的确是可以完成任务的，而且简单直接，但绝大部分有经验的开发者都会尽量避开使用这样的方法。同时，你不能在这里使用闭包或者匿名函数（虽然处理程序本身就是一个匿名函数），而且你的控制范围是有限的。

另一个方法是这样的（也就是你提到的）：
```javascript
element.onclick = funtion () { /* do stuff here */ }
```
&emsp;&emsp;实际上这等价于内联 Javascript （也就是上面那种在 HTML 标签属性中添加的方法），不过这样可以拥有更大的控制范围，同时可以使用匿名函数、函数表达式或闭包。

&emsp;&emsp;内联事件有个重大的缺点就是，不像上面提到的事件监斩器那样，你只可以指定一个内联事件。内联事件会转化元元素的属性，那意味着当指定多个的内联事件时，它之前所指定的内联事件会被覆盖掉。

使用上面 HTML 代码中的```<a>```标签来举个例子：
```javascript
var element = document.getElementById('testing');
element.onclick = function () { alert('did stuff #1'); };
element.onclick = function () { alert('did stuff #2'); };
```
&emsp;&emsp;当你点击这个元素后，你只可以看到 "Did stuff #2"，原因是第二个值覆盖了第一个指定的 onclick 属性，同时，会把 HTML 中 onclick 属性也覆盖掉。

&nbsp;

**二者谁更好呢？**

&emsp;&emsp;主要的问题是浏览器兼容性和必要性。你目前是否需要添加一个以上的事件到一个元素上？未来是否需要？大部分时候，你是需要的。所以，使用attachEvent和addEventListener 是非常有必要的，不然用内联事件就好了。

&emsp;&emsp;JQuery 以及很多其它的 Javascript 框架都为不同的浏览器封装了通用的处理 DOM2 事件的通用模型(Models)，这样你可以在做跨浏览器兼容时不需要为 IE 的历史遗留问题而烦恼了。同样的代码在 jQuery 中做跨浏览器兼容，只需要这样：
```javascript
$(element).on('click', function () { /* do stuff */ });
```
&emsp;&emsp;当然了，不要因为这么一件事而使用一个框架。你可以很容易地写出一个小工具来兼容旧版本的浏览器：
```javascript
function addEvent(element, evnt, funct){
    if (element.attachEvent)
        return element.attachEvent('on' + evnt, funct);
    else
        return elemt.addEventListener(evnt, funct, false);
}

//example
addEvent(
    document.getElementById('myElement'),
    'click',
    function () { aler('hi!'); }
);
```
&emsp;&emsp;综上，除非你看的这段脚本用其他方法处理了不同浏览器之间的差异 ，使用addEventListener的部分不会在 IE 9 以下的 IE 工作。