---
title: 深入理解javascript之this
tags:
  - js之this
id: 629
categories:
  - JS/Jq
date: 2015-07-18 16:26:39
---

[![1401436623](http://www.npm8.com/wp-content/uploads/2015/07/1401436623.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/1401436623.jpeg)

&nbsp;

&emsp;&emsp;**this**应该算是javascript语言里面一个非常有意思的对象，因为他在不同环境下的指向都不一样，这很让很多刚开始学javascript的人容易产生混乱，我以前也是这样一片混乱，但是我建议要深入学习javascript语言的朋友，一定要完全理解**this**对象，因为他的应用非常广泛。今天就总结下这个令人头痛的**this**在不同情况下指向的问题，下面我的学习笔记总结，希望对一些刚开始学习javascript的人有些帮助。

### 情况一：函数调用

我们来看下下面一段简单函数代码：
```javascript
function fn(){
    var x = 5;
    console.log(x); // 5
}
fn();//执行函数，输出5
```
&emsp;&emsp;上面的结果大家应该没有什么疑问，fn输出作用域内的声明的变量x值。但是我们在把上面的代码稍微改一下，变成这样：
```javascript
function fn(){
    this.x = 0;
    var x = 5;
    console.log(x); // 5
}
fn(); //执行函数，输出5
alert(x); //0
```
&emsp;&emsp;上面这段是不是很有意思，我们在fn里面定义了一个**this.x**，在**fn**函数内输出了5，但是在fn函数作用域下我们输出x的时候发先居然是0，而不是5。这是因为我们声明的**var x = 5；**是一个局部变量，外界无法访问，那么输出的0肯定就是**this.x=0;**操作的结果，因为**this.x**相当于**window.x**,这个时候的**fn**内部的**this.x**相当于当于声明了一个全局变量x，代码等同于如下：
```javascript
var x = 0;
function fn(){
    var x = 5;
    console.log(x); // 5
}
fn(); //执行函数，输出5
alert(x); //0
```
&emsp;&emsp;上面这段是不是很有意思，我们在fn里面定义了一个**this.x**，在**fn**函数内输出了5，但是在fn函数作用域下我们输出x的时候发先居然是0，而不是5。这是因为我们声明的**var x = 5；**是一个局部变量，外界无法访问，那么输出的0肯定就是**this.x=0;**操作的结果，因为**this.x**相当于**window.x**,这个时候的**fn**内部的**this.x**相当于当于声明了一个全局变量x，代码等同于如下：
```javascript
var x = 0;
function fn(){
    var x = 5;
    console.log(x); // 5
}
fn(); //执行函数，输出5
alert(x); //0
```

### 情况二：在事件处理程序中

我们再来看下面这一段常见的代码，我们定一个按钮来触发我们要操作的回调函数：
```javascript
var btn = document.getElementById("btn");
btn.onclick = function(){
    this.x = 5;
    console.log(x); // x is not defined 
}
```
再来看另一种事件处理程序写法：
```javascript
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    this.x = 5;
    console.log(x); // x is not defined 
}, false);
```
&emsp;&emsp;程序还是报错，上面两段JS的事件绑定处理程序中的**this**都是指向的ID为**btn**的按钮，而不是**window**,很奇怪的设计，你如果要问我为什么我其实也不知道为什么javascript会这样设计**this**对象；不过大家只要记住上面这个特点以后的工作中就不会犯错了。

### 情况三：作为对象方法的使用

函数还可以作为某个对象的方法调用，这个时候**this**就指这个上级对象。
```javascript
var arg = 0;
function test(){
    console.log(this.arg);
}
var fn = {};
fn.arg = 5;
fn.f = test;
fn.f(); // 5
```
其实上面这段代码还可以转换成下面这种写法：
```javascript
var arg = 0;
var fn = {
    arg : 5,
    test : function(){
        console.log(this.arg); // 5
    }
}
fn.test(); // 5
```
&emsp;&emsp;此时的**this**也是指向**fn**这个对象的，上面这个需要特别注意，不要搞混，在面向对象编程的时候非常需要理解这个**this**在这里的指向。

### 情况四：作为构造函数时使用

&emsp;&emsp;所谓的构造函数简单的理解就是**new**一个新对象，然后调用他，如下：
```javascript
function fn(){
    this.x = 5;
}
var test = new fn();
console.log(test.x); // 5
```
&emsp;&emsp;上面的代码应该大家都很常见，这个时候的**this**指向的这个**new**出来的新对象，我们来做个测试，看看this是不是真的指向的是new出来的新对象还是全局(**window**)：
```javascript
var x = 0;
function fn(){
    this.x = 5;
}
var test = new fn();
console.log(test.x); // 5
console.log(x); // 0
```
&emsp;&emsp;大家看上面的结果，this如果指向全局（**window**）那我们的最后一行代码也将会输出5，而不是0。

### 情况五：调用apply

&emsp;&emsp;apply函数在js在也是扮演这很重的角色，他被很多人用来实现函数的继承，因为这个方法能劫持另外一个对象的方法，继承另外一个对象的属性.

我们把情况三的代码改动成如下：
```javascript
var arg = 0;
var fn = {
    arg : 5,
    test : function(){
        console.log(this.arg); // 5
    }
}
fn.test.apply(); // 0
```
&emsp;&emsp;当调用**apply()**函数后，我们发现**this**他将不再指向这个对象本身了，而是指向了全局对象（**window**）。

&emsp;&emsp;那如果我们要通过**apply()**函数让**this**指向对象本身怎么办呢？我们可以这样写：
```javascript
var arg = 0;
var fn = {
    arg : 5,
    test : function(){
        console.log(this.arg); // 5
    }
}
fn.test.apply(fn); // 5
```
只需在**apply()**函数指向**fn**就可以了。