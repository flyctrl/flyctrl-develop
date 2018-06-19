---
title: javascript模块化开发详解
tags:
  - JavaScript模块化
  - JavaScript模块化开发
  - js模块化
  - js模块化开发
id: 2220
categories:
  - JS/Jq
date: 2016-03-21 11:47:54
---

**模块化：**
每个模块只完成一个独立的功能，然后提供该功能的接口。模块间通过接口访问。模块中的（过程和数据）对于其它模块来说是私有的（不能访问修改）

**原始人写法：**
```javascript
function m1(){
//...
}
function m2(){
//...
}
```

## **对象封装写法**

```javascript
var loveThing = {
mylove : "coding",
getLove :function() {
returnthis.mylove;
},
sayLove : function(thing) {
console.log(thing);
}
}
```
console.log(loveThing.getLove());//>>> coding
loveThing.sayLove('girl');//>>> girl

这种写法已经有点模块的样子了，一下就能看出这几个函数和变量之间的联系。
缺点在于所有变量都

**必须声明为公有**，所以都要加this指示作用域以引用这些变量。更危险的是，在对象之外也能轻松更改里面的参数：

loveThing.mylove = "sleeping";

console.log(loveThing.getLove());//>>> sleeping

## **立即执行函数**

外部可以访问my这个接口，但以下代码（过程和数据）对于其它模块来说是私有的
以下这种方法**返回一个对象，让其他模块去调用**
```javascript
var loveThing = (function(){
var my = {};
var love = "coding";
my.getLove = function() {
return love;
}
my.sayLove = function(thing) {
console.log(thing);
}
return my;
})();
```
console.log(loveThing.getLove());//>>>
coding loveThing.sayLove('reading');//>>> reading

**将局部的函数提升到windows下面，可以让其他地方使用。**
```javascript
(function(){
// private code
var a = function(){

}
window.a = a;
})();
```
我们试着获取里面的变量：
console.log(loveThing.love);//>>> undefined

果然，**外部根本看不见里面的零件**，**只能使用提供的接口**。这样才能保证私有变量的安全。

## **输入全局变量**

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

下面除了保证模块的独立性，还使得模块之间的依赖关系变得明显。
```javascript
var module1 = (function ($,) {
//...
})(jQuery,);
```

## **CommonJS和AMD**

目前，通行的Javascript模块规范共有两种：**CommonJS**和**AMD**。

最近在学习node，node.js的模块系统，就是参照CommonJS规范实现的。只使用require()，用得一个爽字

例如：

var math = require('math');

然后，就可以调用模块提供的方法：

var math = require('math');

math.add(2,3); // 5

然而，由于一个重大的局限，使得**CommonJS规范不适用于浏览器环境**。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？

第二行math.add(2,3)，在第一行require('math')之后运行，因此**必须等math.js加载完成**。也就是说，如果**加载时间很长，整个应用就会停在那里等。**

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

**AMD**是"Asynchronous Module 

Definition"的缩写，意思就是"异步模块定义"。**require.js**实现了AMD规范

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数

**require([module], callback);**

*   **[module]**：数组，要加载的模块；


*   **callback**：加载成功之后的回调函数。
