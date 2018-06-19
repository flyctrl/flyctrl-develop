---
title: js操作iframe框架的一些基本概念
tags:
  - js操作iframe
  - js操作iframe框架的概念
id: 1975
categories:
  - JS/Jq
date: 2015-12-22 17:01:32
---

**1、获取iframe的window对象**

存在跨域访问限制。

iframeElement.contentWindow　　兼容

&nbsp;

**2、获取iframe的document对象**

存在跨域访问限制。

chrome: iframeElement.contentDocument

firefox: iframeElement.contentDocument

ie:iframeElement.contentWindow.document(ie没有iframeElement.contentDocument属性)

var getIframeDocument = iframeElement.contentDocument||iframeElement.contentWindow.document;

&nbsp;

**3、iframe中获得父页面的window对象**

存在跨域访问限制。

父页面：window.parent　　兼容

顶层页面：window.top　　兼容

&nbsp;

**4、获取iframe在父页面中的html标签**

存在跨域访问限制。

window.frameElement　　兼容

&nbsp;

**5、iframe的onload事件**

非ie浏览器都提供了onload事件。例如下面代码在ie中是不会有弹出框的。
```javascript
var ifr = document.createElement('iframe');
ifr.src = 'http://www.b.com/index.php';
ifr.onload = function() {
alert('loaded');
};
document.body.appendChild(ifr);
```
但是ie却又似乎提供了onload事件，下面两种方法都会触发onload

**方法一：**
```html
<iframe onload="alert('loaded');" src="http://www.b.com/index.php"></iframe>
```

**方法二：**
```javascript
//只有ie才支持为createElement传递这样的参数
var ifr = document.createElement('<iframe onload="alert('loaded');" src="http://www.b.com/index.php"></iframe>');
document.body.appendChild(ifr);
```

由于iframe元素包含于父级页面中，因此以上方法均不存在跨域问题。

实际上IE提供了onload事件，但必须使用attachEvent进行绑定。
```javascript
var ifr = document.createElement('iframe');
ifr.src = 'http://b.a.com/b.php';
if (ifr.attachEvent) {
ifr.attachEvent('onload', function(){ alert('loaded'); });
} else {
ifr.onload = function() { alert('loaded'); };
}
document.body.appendChild(ifr);
```
&nbsp;

**6、frames**

window.frames可以获取到页面中的节点(iframe、frame等)，需要注意的是取到的是window对象，而不是HTMLElement。
```javascript
var ifr1 = document.getElementById('ifr1');
var ifr1win = window.frames[0];
ifr1win.frameElement === ifr1; // true
ifr1win === ifr1; // false
```
补充：

var iframeObj = document.getElementById('iframeid');

**a：获取子页面中body里的内容**

var iframeContent = iframeObj.contentWindow.document.body.innerHTML;

**b：获取子页面中head里的内容**

var iframeContent = iframeObj.contentWindow.document.head.innerHTML;

**c：获取子页面中html里的内容**

var iframeContent = iframeObj.cententWindow.document.documentElement.innerHTML;

**d：获取子页面中某个元素里的内容**

var iframeContent = iframeObj.contentWindow.document.getElementById('element_id').innerHTML;
&nbsp;