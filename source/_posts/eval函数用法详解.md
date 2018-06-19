---
title: eval()函数用法详解
tags:
  - eval()函数
  - eval()函数用法
id: 1959
categories:
  - JS/Jq
date: 2015-12-18 10:19:41
---

**eval()函数用法详解:**

此函数可能使用的频率并不是太高，但是在某些情况下具有很大的作用，下面就介绍一下eval()函数的用法。
语法结构:
```javascript
eval(str)
```
此函数可以接受一个字符串str作为参数，并把此str当做一段javascript代码去执行，如果str执行结果是一个值则返回此值，否则返回undefined。如果参数不是一个字符串，则直接返回该参数，实例如下:
```javascript
eval("var a=1");//声明一个变量a并赋值1。
eval("2+3");//执行加运算，并返回运算值。
eval("mytest()");//执行mytest()函数。
eval("{b:2}");//声明一个对象。
```
在以上代码特别注意的是，最后一个语句是声明了一个对象，如果想返回此对象，则需要在对象外面再嵌套一层小括号，如下:
```javascripte
val("({b:2})");
```
以上内容简单介绍了eval()函数的用法，比较容易理解。此函数最让人感到困惑的是关于它的作用域问题，下面就结合实例来介绍一下相关内容，先看一段代码实例:
```javascript
function a(){ 
  eval("var x=1"); 
  console.log(x); 
} 
a(); 
console.log(x);
```
在上面的代码中，第一个alert()函数能够弹出1，而第二个会因为x未定义而报错。

由以上表现可以得出，eval()函数并不会创建一个新的作用域，并且它的作用域就是它所在的作用域。这在所有主流浏览器都是如此，但是有时候需要将eval()函数的作用域设置为全局，当然可以将eval()在全局作用域中使用，但是往往实际应用中，需要在局部作用域使用具有全局作用域的此函数，这个时候可以用window.eval()的方式实现，例如以上代码可以改造如下:

```javascript
function a(){ 
  window.eval("var x=1"); 
  console.log(x); 
} 
a(); 
console.log(x);
```
在上面的代码中，两个alert()语句都能够正常弹出1。但是此中方式在标准浏览器中是可以的，但是在IE8和IE8以下浏览器中的表现依然和eval()一样，作用域是它们所在的作用域。这个时候可以使用IE浏览器独有的window.execScript()解决IE8和IE8浏览器的问题。为了实现兼容所有主流浏览器，把代码改造如下:
```javascript
function a(){ 
  if(window.execScript){ 
    window.execScript("var x=1"); 
  } 
  else{ 
    window.eval("var x=1"); 
  } 
  console.log(x); 
} 
a(); 
console.log(x);
```
如果浏览器支持window.execScript()，则使用此函数，不支持则使用window.eval()，这样就可以解决IE8和IE8以下浏览器的问题。

**特别说明:**

上面所有代码建议复制到本地进行测试，可能在本编辑器内有误。