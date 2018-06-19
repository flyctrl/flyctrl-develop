---
title: javascript函数探索与总结
tags:
  - javascript函数
id: 2284
categories:
  - JS/Jq
date: 2016-04-07 10:50:40
---

知道大家比较喜欢看那种“某某效果”那样的文章，毕竟不费什么时间，几眼就看完了。首页上大半也都是这样的文章。本人不擅长写效果，还是献一篇长文。写了很长时间的，例子没敢举复杂的，实现也是用最简单的写法。点到为止，是一篇知识由厚到薄个人总结篇。

在js中函数是非常重要，本文尝试用组合学的观点，来推导函数中常见概念。

这里可以做一点保证，从头看到尾后，各种概念会有一种“就是这么回事儿”和“原来如此！”的感觉，简约而不简单。

##  装备准备篇
### **1.函数是干什么用的？函数主要有三种作用：**
1.封装逻辑

这个可以说，在所有语言里，函数最初的意义，不用多说，就是可复用代码块的封装，可以调用。


2.提供作用域

作用域是啥呢？指的是变量的可见性问题。众所周知，js中是没有块儿级作用域。一般语言中变量作用域，也有全局作用域和局部作用域之分。而在js中函数是提供作用域的最小单位。

3.可以作为构造函数

js是一门基于原型的语言，而又可以通过new操作符，来达到基于类语言那种使用方式。在js中构造函数的责任，就落到函数本身上了。

### **2.函数是一等公民！**
想必你一定听过这样一句话儿，在js中一切都是对象。
今天也要记住下面这句话，在js中一切都是值。
没错！你没听错。
原因就是函数被设计成了一等对象。
那什么是一等对象呢？
使用一等对象就想可以使用值那样！

0.函数可以没有名字。
```javascript
(function(){})();
```
1.函数可以像数字那样可以储存为变量。
```javascriptvar
fun = function(){};
```
2.函数可以像数字那样可以储存在某个结构中。
```javascript
var fun = [1, function(){}];
var fun2 = {x: function(){}};
```
3.函数可以像数字那样可以作为函数的参数。
```javascript
var a = function(){};
var b = function(fun){ fun() };
b(a);
```
4.函数可以像数字那样可以作为函数的返回值
```javascript
var a = function(){ return function(){} };
```
5.函数可以像数字那样动态创建出来。
```javascript
2+3*(function(){})();
```
至于一等对象，在js中还有吗？有的，[]是，{}是。
由此看来函数被设计成了一种数据类型，没神马大惊小怪的。（"undefined"、 "boolean"、"string"、"number"、"object"和"function"）
所以我们要记住这句话，在js中一切都是对象又都是值。真是既对立又统一，这里问候一下马克思爷爷。

### **3.另外还需准备函数相关材料**

arguments, this, call, apply

这些是初等材料，上网随便搜搜，都有的。本网站类似的文章，可谓不计其数，我竟然也写了几篇。。。

### **4.丢掉包袱**

我们要丢掉性能的相关考虑,不然会错过很多美景。

## 起航篇

### **1.函数基本雏形**
```javascript
var fun = function(a, b) {
        console.log(arguments);
        console.log(this);
        return a + b;
};
fun(1, 2);
```
可以说是函数的最简单的例子。
这里稍微说一下this，打印的是全局对象，比如在浏览器中window。严格模式下，是undefined。不信你可以加句"use strict"，调试一下看看。

### **2.以函数为参数**
jquery用多了，这个很好理解的。
我们以数组的es5中方法，来举例
比如
```javascript
[1, 2, 3].forEach(alert);
```
看起来怪怪的，alert是函数，做为参数传进来，然后调用，分别弹出1、2、3。其实也没啥不好理解的。
换成如下写法呢？
```javascript
[1, 2, 3].forEach(function(value){ alert(value) });
```
是不是也没问题。

### **3.以函数为返回值**
```javascript
var getAlert = function() {
        return alert;
};
var myAlert = getAlert();
myAlert(1);
```
如你所料能弹出结果1。如果getAlert把改成如下的呢？我们应该也认识的。
```javascript
var getAlert = function() {
        return function(value) {
                alert(value);
        };
};
```
看到这里，你恐怕会想，好简单那。知道你不是夸我文章写得好清楚，而是说这些东西，谁不知道，还至于写篇文章吗？哈哈，老姚的文章从来都是由易到难的。

ok，我们下来开始搭积木，就由这些浅显的东西，来搭一段旅程，看看有什么风景。

### **4.闭包**
我们来看看上面那个getAlert，恩，这是个函数。运行过后，返回一个函数没问题。

稍微稍微复杂一点
```javascript
var fun = function() {
        var x = 0;
        return function() {
                alert(x);
        };
};
var f = fun();
f();
```
恩，弹出0没问题。
别小看这么就这么简单一段代码。就是闭包。
f调用，是一个函数调用，里面遇到一个x，浏览器得找到这个变量。
浏览器是按照就近原则来找的，x=0，没问题的。

再稍微改写下，
```javascript
var fun = function() {
        var x = 0;
        return function() {
                alert(++x);
        };
};
var f = fun();
f();
f();
```
分别弹出的是1和2，为啥都不是1呢？他相当于如下的代码
```javascript
var x = 0;
var f = function(){
        alert(++x);
};
f();
f();
```
如果这个能理解，那么上面那个闭包就能理解。相当于浏览器给f开辟一个空间存储了x的值。
如果，换种方式调用呢？
```javascript
var fun = function() {
        var x = 0;
        return function() {
                alert(++x);
        };
};
var f = fun();
f();
var g = fun();
g();
```
此时两次都是弹出1的。原因是啥呢？因为fun返回是两个函数，浏览器存了两次副本。
相当于如下代码
```javascript
var x1 = 0;
var f = function(){ alert(++x1) };
var x2 =0;
var g = function(){ alert(++x2) };
f();
g();
```
这里讲了一下闭包（可以把返回那个函数称为闭包）。其实我以前写过闭包的文章，这里重复是为了保持思维的连贯和为后续做准备。所以有必要再重申一下产生闭包的三个条件

>1.调用的函数是内部声明

>2.调用的函数是在声明位置函数之外进行调用

>3.调用的函数引用外部变量。

如下的函数，就不是闭包，会报错的。
```javascript
var fn = function() {
                alert(++x);
};
var fun = function() {
        var x = 0;

        return fn;
};
var f = fun();
f();
```
继续看
```javascript
var fun = function(x) {
        return function() {
                alert(++x);
        };
};
var f = fun(0);
f();
f();
```
这个东西是不是闭包呢,是的。满足那三个条件。
再看
```javascript
var fun = function(x) {
        return function(x) {
                alert(++x);
        };
};
var f = fun(0);
f(1);
f(1);
```
这个就不是，因为函数引用的x是内层的x（形参）不是外层的。

闭包的概念讲完了，你说我们的旅程还得向那走呢？
不是组合学吗？假如alert是一个传进来的函数怎么办呢？
```javascript
var sum = function(x, y){ alert(x + y) }
var fun = function(call) {
        var x = 0, y =0;
        return function() {
                x++;
                y++;
                call(x, y);
        };
};
var f = fun(sum);
f();
f();
```
ok,弹出的果然是2和4。恩，确实是闭包。
但是从这里可以引进一段新的旅程。

### **5.柯里化**
```javascript
var curry = function(fun) {
return function(arg) {
fun(arg);
};
};
var myAlert = curry(alert);
myAlert(1);
```
看着没神马鸟用啊,绕了一圈，不还是alert出1吗。
有用处的。前几天回答一个帖子就用到了这个。能把函数的多个实参，限制成一个参数。多的这里就不提了。我们还是继续研究研究柯里化。

上述代码稍微变化一下
```javascript
var curry = function(fun){
        var x = 60;
        return function(y){
                return fun(x,y);
        };
};
var sum = function(x, y){ return x + y};
var sum60 = curry(sum);
sum60(5);//=>65

var devide = function(x, y){return x / y};
var devide60 = curry(devide);
devide60(5);//=>12
```
可以看出柯里化的好处了吗？由一个sum函数就能创建出一个sum60函数。由一个devide函数能创建出一个devide60来。总体来说curry化，是一个由函数构建函数的工具。

我不想为限定为60呢，待限定的数字是否可以作为参数传进来
```javascript
var curry = function(fun, x){
        return function(y){
                return fun(x,y);
        };
};
var sum = function(x, y){ return x + y};
var sum60 = curry(sum,60);
sum60(5);//=>65
```
我想由一个devide创建出来一个devideBy60的函数呢？也可以
代码如下：
```javascript
var curry = function(fun, x){
        return function(y){
                return fun(y,x);
        };
};
```
这就涉及到一个左右的问题了。稍后会讲。
下来我们针对多参数，来说说横向展开和纵向展开的问题。
横向展开,以4个参数为例
```javascript
var curry = function(fun,x,y){
        return funciont(z,w){
                return fun(x,z,y,w);
        }
}
```
像这种写法，能写出很多种。
按概念来说，其实这种横向展开写法，并不是currying化。但我们要关注的是本质。

本质是啥呢？本质是延迟参数的传递。至于你管这个函数叫什么都无所谓。我这里也称为currying化。到时，怕你看其他书籍后，回头说老姚，你就瞎忽悠。哈哈。

继续看例子。关于横向展开的，其中有一种是我们bind的模拟
```javascript
var bind = function(fun,context){
        return function(args){
                return fun.apply(context, args);
        }
}
```
同样，也可以写一种占位符方式的，这种方式是比较实用的。
这里用_来占位
```javascript
var _ = {};//只要是引用，保证不报错就行
var curry = function(fun){
        var rest = [].slice.call(arguments, 0);
        rest.shift();//rest = [1, _, 3, _]
        return function(){
                var args = [].slice.call(arguments, 0);//args = [2, 4]
                var finalArgs = rest.map(function(value, index){
                        if(value === _){
                                return args.shift();
                        }
                        return value;
                });//finalArgs = [1, 2, 3, 4]
                return fun.apply(this,finalArgs);
        }
}
var fun = function(a, b, c, d){
        alert("" + a + b + c + d);
}
var f1 = curry(fun, 1, _, 3, _);
f1(2,4);//=>1234
```
上面代码看起来比较复杂而已，一行行看下来，应该是能看懂的。这里只是一个简单的实现，没有考虑太多。

call和apply以及[].map方法，我假设你已经会了。

纵向展开，3个参数为例
```javascript
var curry = function(fun) {
        return function(z) {
                return function(y){
                        return function(x){
                                return fun(x,y,z); 
                        }
                }
        };
};
var sum = function(x, y, z){
        return x + y +z;
}; 
var r = curry(sum)(5)(10)(15);
alert(r);//=>30
```
上面这个curry化是从右向左展开的。如果改成return fun(z,y,x)，就是从左向右展开。

我们来看看curry(sum)(5)(10)(15),这个调用，是否很有感觉？？？

我知道你现在想说啥？“然而并无卵用”，我猜对了吗。
如果参数是函数的话，我们其实可以看出curry化，是一种形式更语义化的调用。
至于例子嘛，我还没想好，以后可能会补上。

关于参数和返回值相关内容铺垫地差不多了。下来我们主要来瞧瞧所有参数都是函数，那会怎么样？

### **6.函数组合**

便于分析，先举一个例子
```javascript
var sum = function(x, y) {
        return x + y;
};
var minus = function(x, y) {
        return x - y;
};
var power = function(x) {
        return x * x;
};
```
如果我们想先做和，然后再平方呢，我们怎么写。
调用如下，
```javascript
power(sum(1, 2))//=>9
```
我们可以构建一个和平方函数sumPower
```javascript
var sumPower = function(x, y){
        return power(sum(x, y));
};
```
恩，这可以说是一种最直接的方式。

power(sum(1,2))这种调用在数学上可以看做是两个函数的乘积。即函数组合，变成一个新函数。这种写法，是比较直接，但是不通用。比如我还想要minusPower，难道在重新写一遍。所以我们要重新审视一遍那段代码。因为函数可以当参数传，我是不是可一遍把power和sum传进来呢？

可以直接改写如下
```javascript
var getSumPower = function(power, sum) {
        return function(x, y){
                power(sum(x, y))
        };
};
sumPower = getSumPower(power, sum);
sumPower(1, 2);
```
所以现在我们的任务是把getSumPower改成一个通用的函数，以便我们不仅能获取
sumPower，还能获取minusPower。
这里我得实现一个组合函数compose，能实现如下效果
```javascript
var newfunc = compose(f, g, h);
newfunc(x)<=>f(g(h(x)))
```
尝试实现如下：
```javascript
compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
                var i = start;
                var result = args[start].apply(this, arguments);
                while (i--) result = args[i].call(this, result);
                return result;
    };
};
```
实现原理还是很简单的，一行行看下来就能看明白了。不用我说了吧，说也是照着代码念一遍而已。看过我underscore源码分析系列的同学能知道，你这哪是尝试实现，你这就是原封不动地抄来的好嘛。真不骗你这个函数我敲过n遍了，都能背下来了。
使用如下，
```javascript
var sumPower = compose(power, sum);
var minusPower = compose(power, minus);
```
ok,关于组合这道风景线，我们先到此打住。如果从数学的角度去分析这个问题。

比如从满足结合性和交换性的角度，即半群理论来产开此问题。估计又能写一篇文章了。

f(g(h(x)))从这个调用来看，让人不由得想到管道这个概念。

### **7.管道**
管道目的也是一个函数运行完后把返回值扔给下个函数当初始值。也是传递接力棒。而管道跟组合关注点不一样。

组合关注的是由函数f、g和h怎么组成一个新函数。而管道关注是流程，是否一层层调用下去。

实现如下
```javascript
var pipeline = function(initValue) {
        var args = [].slice.call(arguments, 0);
        args.shift();
        return args.reduce(function(prev, next){ return next(prev) }, initValue);
};```
使用如下：
```javascriptpipeline(4, function(x){ return x * 2; }, function(){return x * 3});
```
最后一部分讲一下链式调用。

### **8.链式法则**

说到链式法则，恐怕大家会想，这个我知道，不就是方法最后返回this嘛。
比如jq
```javascript
$('<div></div>').css({ height: '40px'}).attr('id','newDiv').appendTo('body');
```
关于这种实现略举一例子
```javascript
var f = function(args){
        if(!(this instanceof f)) return new f(args);
};
f.prototype = {
        fun1: function(){ return this; },
        fun2: function(){ return this; }
}
var instance = f();
instance.fun1().fun2();
```
稍微说一下，看到构造函数里的if了吗？说明函数调用可以不new，内部也会new的。这种方式被称为稳妥（安全）构造函数。

链式法则的链是什么？就是点运算符。一般常说的链式法则指的是点儿之前的对象，是同一个对象。而我这里要提的是一般情况下的链式调用.

比如如下这种方式的
```javascript
var getArray = function(x, y){ return [x, y] }
getArray(1,2).map(function(x){ return x * x }).forEach(alert);
```
这种代码风格，有点流水线的风格。既然是点运算符嘛，那得要求返回值是对象才行的。

我们假设链式调用形式长成这样的：
```javascript
object.fun1().fun2().fun3()```
我们用数组reduce来尝试模拟
```javascript["fun1", "fun2", "fun3"].reduce(function(prev, next){
        return prev[next]();
}, obj);
```
上面实现是没有考虑参数的问题，所以得有个储存结构存下相关数据

且看实现
```javascript
var chain = function(obj) {
        if(!(this instanceof chain)) return new chain(obj);
        this.start = obj;
        this.data = [];
};
chain.prototype = {
        link: function(methodName){
                var args = [].slice.call(arguments, 0);
                args.shift();
                this.data.push({
                        name: methodName,
                        args: args
                });
                return this;
        },
        run: function(){
                return this.data.reduce(function(prev, next){
                        var name = next.name;
                        var args = next.args;
                        return prev[name].apply(prev, args);
                }, this.start);
        }
};
```
大致看一下代码，link是存储，run是整体调用。

使用方式,如下：
```javascript
chain([1,2,3])
.link('map', function(x){ return x * x })
.link('forEach', alert)
.run();
```
这跟直接使用
```javascript
[1,2,3].map(function(x){ return x * x }).forEach(alert)
```
有什么区别呢？
chain是一种惰性链。比较懒的，你调用run时我才运行。也就是说，我们可以一直拼接链下去，直到你不想拼了，最后run一下就链式调用了。