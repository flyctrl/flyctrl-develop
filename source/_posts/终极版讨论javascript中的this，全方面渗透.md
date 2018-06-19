---
title: 终极版讨论javascript中的this，全方面渗透
tags:
  - javascript中的this
id: 2039
categories:
  - JS/Jq
date: 2016-01-07 22:39:05
---

&emsp;&emsp;在JavaScript中，this 的概念比较复杂。除了在面向对象编程中，this 还是随处可用的。这篇文章介绍了javascript中的this相关知识，对javascript this相关知识感兴趣的朋友一起学习吧!
JavaScript 是一种脚本语言，因此被很多人认为是简单易学的。然而情况恰恰相反，JavaScript 支持函数式编程、闭包、基于原型的继承等高级功能。

&emsp;&emsp;本文仅采撷其中的一例：JavaScript 中的 this 关键字，深入浅出的分析其在不同情况下的含义，形成这种情况的原因以及 Dojo 等 JavaScript 工具中提供的绑定 this 的方法。可以这样说，正确掌握了 JavaScript 中的 this 关键字，才算迈入了 JavaScript 这门语言的门槛。
至于js中this这个东西，好多淫解释过了，看起来好高端的样子，不晓得你看懂了木有？好了，下面加上鄙人比较挫的解释

论点：this 不是变量，不是属性，不能为其赋值，它始终指向调用它的对象

感觉还TM太虚了，只要记住最重要的一条即可”它始终指向调用它的对象“ ，所以找到调用this的对象，就知道this到底指向谁了

**1、**
```javascript
alert(this);
```
瞅瞅，弹出来的是么子，要么是”object window“ ,要么 "object" 总之就对象了，是那个对象呢？
alert(this === window);
结果为'true' 所以了，现在调用它的对象是window了

**2、**
```javascript
var test = function(){
alert(this);
}
test();
```
猜猜上面弹出什么，是不是和"alert(this)" 这句一样的
```javascript
var test = function(){
alert(this === window);
}
test();
```
运行上面的代码，是不是弹出了'true' ?
事情就这样完了？
要这么简单的话，何必那么多人都去论述这个鸟了？

**3、**
再来
```javascript
var test = function(){
alert(this === window);
}
new test();
```
哎哎，这次咋成'false'呢？
记住”this 始终指向调用它的对象“，第”1、“处调用该段代码的直接对象是全局对象，即"window" ；第”2、“处虽然是函数，但是调用其的仍然是”window“(不要弄混了，函数虽然是对象，但是调用它的是另一个对象)；第”3、“处，使用了”new“ 这时其实已经发生变化了，这是一个构造函数，构造函数创建时创建了一个新的空的对象，即”new test()“创建了一个新的对象，然后再由这个对象指向函数"test"中的代码，因此此时this不在是window对象，而是该构造函数创建的新对象。

**4、**
```javascript
var test ={
'a':1,
'b':function(){
alert(this === test)
}
}
test.b();
```
有了上面的论点，这下一下子清楚了吧！

**5、**
```javascript
var test ={
'a':1,
'b':function(){
alert(this === test)
}
}
var test1 = test;
test1.b();
```
so, 你不会认为结果为"false"吧，错了，虽然'test1'的值为'test' 但是'test1'不还是'test'对象么，它有新产生对象，你暂且理解为引用的了，两个都指向一个对象，奉上下面一段代码为证
```javascript
var test ={
'a':1,
'b':function(){
alert(this === test)
}
}
var test1 = test;
test.a = 2;
alert(test1.a);
```
如果弹出了”1“，你来骂我

**6、再整个复杂的**
```javascript
var test ={
'a':1,
'b':{
'b1':function(){
alert(this === test);
}
}
}
test.b.b1();
```
这是"true"还是"false"呢？
按照上面的理论，这时"this"不再直接被'test'调用了，而是被'test.b' 调用, 奉上下面一段代码为证
```javascript
var test ={
'a':1,
'b':{
'b1':function(){
alert(this === test.b);
}
}
}
test.b.b1();
```
**7、好再整个复杂点的**
```javascript
var test = function(){
var innerTest = function(){
alert(this === test);
}
innerTest();
}
test();
```
你不会认为弹出"true"吧，不是按照上面的理论'innerTest'是被'test'调用的，然后'this'就指向'test'吗？
额，错就错在是谁调用的'innerTest', 其实这种函数都是'window'对象调用的，及时你嵌套一千层，调用各个函数的都是'window'对象,奉上下面这段代码为证
```javascript
var test = function(){
var innerTest = function(){
alert(this === window);
var innerTest1 = function(){
alert(this === window);
}
innerTest1();
}
innerTest();
}
test();
```
**8、再来一段特殊的**
```javascript
var test = function(){
alert(this === window);
}
var test1 = {
}
test.apply(test1);
```
这个我觉得大家都不会猜错，该函数的作用就是”调用一个对象的一个方法，以另一个对象替换当前对象“ 所以了'window' 对象已经被替代为'test1'，自然为'false'了,奉上如下代码以为证明
```javascript
var test = function(){
alert(this === test1);
}
var test1 = {
}
test.apply(test1);
```
那么诸如'call'之类的也就相似了

**9、再来一个原型的继承，区别于字面量的继承**
```javascript
var test = function(){
}
var my = function(){
this.a = function(){
alert(this === mytest2);
}
}
var mytest = new my();
test.prototype = mytest;
var mytest2 = new test();
mytest2.a();
```
**10、还剩下些什么了，可能就是'dom'对象了**
```html
<script>
var mytest = function(context){
alert(context.getAttribute('id'));
alert(this === window);
}
</script>
<div id="test" onclick="mytest(this)">aaaa</div>
```
看了上面的应该了解了吧，里面的'this'分别代表神马