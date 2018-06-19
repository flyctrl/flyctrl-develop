---
title: javascript定义类的3种方法
tags:
  - js自定义类
id: 624
categories:
  - JS/Jq
date: 2015-07-18 16:00:47
---

[![1401439153](http://www.npm8.com/wp-content/uploads/2015/07/1401439153.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/1401439153.jpeg)

大家都知道javascript是一门弱语言，其语法非常灵活，你很可能经常会看见这样子的情况，一个JS功能，可以用N种写法去实现它，不同的人用不同的写法来进行实现。正因为javascript这种语言不够严谨，他和C,C++这些语言相比最大的缺点就是没有类的功能。但是我们其实是可以用javascript的函数来模拟类，来进行面向对象化的编程。今天我就来总结一下javascript定义类的3种方法，以下是我的学习笔记：

### 1、使用函数定义

定义一个正常的JavaScript函数,这个应该是最普遍的一种方法，通过创建函数，给函数定一个函数名，然后在函数内定义我们所需要的属性或方法来，如下：
```javascript
function method (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = getMethodInfo;
}
function getMethodInfo() {
    return this.color + ' ' + this.type + ' method ';
}
```
然后我们现在需要实例化上面的函数，调用里面的方法和属性时，我们可以这样做：
```javascript
var newMethod = new method('animal');
newMethod.color = "blue";
alert(newMethod.getInfo());//blue animal Method
```

### 1.1在函数内部定义方法：

在上面的这种方法里面我们把我们的类方法单独写了一个函数来调用，这种方法的一个最大的缺点是增加了全局函数，容易发生全局函数污染，在大的项目里面，很容导致函数命名冲突，为了减少全局函数的污染，我们可以将函数方法，写在类里面，例如：
```javascript
function method (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function(){
    	return this.color + ' ' + this.type + ' Method ';
    };
}
```
调用方法和上面是一样的：
```javascript
var newMethod = new method('animal');
newMethod.color = "blue";
alert(newMethod.getInfo());blue animal Method
```

### 1.2往函数添加原型方法，俗称工厂模式

1.1方法的缺点就是我们每次添加新的方法都需要到我们定义类里面去添加，这样子还是比较麻烦，也容易导致出错的，有没有什么办法能在不干预我们之前定义好的类的前提下，另外往这个类里面添加新的方法呢？这个时候我们就可以使用比较著名的工厂原型方法来实现，以上代码改写后：
```javascript
function method (type) {
    this.type = type;
    this.color = "red";
}
method.prototype.getInfo = function() {
    return this.color + ' ' + this.type + ' Method';
};
method.prototype.getInfo2 = function() {
    return this.color + ' ' + this.type + ' Method2';
};
```
然后调用方法同上：
```javascript
var newMethod = new method('animal');
newMethod.color = "blue";
alert(newMethod.getInfo());//blue animal Method 
alert(newMethod.getInfo2());//blue animal Method2
```

### 2.对象字面量方法

对象字面量的方法非常的强大，在javascript中应用非常个广泛，其结构清晰，简单，下面我只做一个简单的介绍，有兴趣的同学建议可以看一看这篇文章[《Using Objects to Organize Your Code》](http://rmurphey.com/blog/2009/10/15/using-objects-to-organize-your-code/ "Using Objects to Organize Your Code") 。

我们平常定义一个数组的时候我们可能会用简写来代替，例如用：
```var arr = []```
代替
```var arr = new Array();```
当然我们创建对象的时候也可以用简写，例如：
```var fn = {}```
来代替：
```var fn = new Object();```
根据上面这个例子，我们也可以将我们上面的那个方法改写成对象字面量：
```javascript
var method = {
    type: "animal",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' Method';
    }
}
```
通过上面这种方法有点是我们调用的时候就不需要再使用new来实例化，我们可以通过如下的方法来调用：
```javascript
method.color = "blue";
alert(method.getInfo());//blue animal Method
```
上面这种方法我们有时候也称它为**单例**，因为他是不能在被实例化多个对象，我们只能单一的使用它。根据上的代码，我们如果用第一种方法来实现，是肯定会报错的：

```var newMethod = new Method(); //会报错```
但是对象字面量法并不算是完全单例模式，我们其实可以通过深拷贝来继承他，相当将他的所有属性和方法拷贝给另一个对象来实现类似实例化的对象的方法。既然都说到这块了，我就简单说下深拷贝的实现方法吧：

**深拷贝继承代码：**
```javascript
function deepCopy(p, c) {
    var c = c || {};
　　for (var i in p) {
　　　　if (typeof p[i] === 'object') {
　　　　    c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　deepCopy(p[i], c[i]);
　　　　} else {
　　　　　　c[i] = p[i];
　　　　}
　　}
　　return c;
}
```
然后我们通过上面这个方法，再将定一个对象来继承我们刚刚写的**method**方法：
```javascript
var method2 = deepCopy(method);
method2.color = "blue";
console.log(method2.getInfo());//blue animal Method
```
通过这种深拷贝，我们相当于是等于实例化了一个新的对象拥有了method的所有属性和方法，据说目前，jQuery库使用的就是这种继承方法，这个方法是我从别人那里看到的，并不是我发现的哈。

### 3.使用单例函数方法

第三种方法其实是结合了上面的两个方法。您可以使用一个函数
```javascript
var method = new function() {
    this.type = "animal";
    this.color = "red";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' Method';
    };
}
```
上面的方法看起来似乎很像1.1的语法，但是我们调用上面的类的时候又是和对象字面量的方法一样：
```javascript
method.color = "blue";
alert(method.getInfo());//blue animal Method
```
**new function(){...}**
其实包含了两个功能：

*   定义了一个函数（匿名函数）
*   并实例化他后立即调用
上面这种方法比较少见，用法就看你自己怎么去选择了，如果你定义了一个类，但是只想使用一次，但你只会使用一次这个类，你可以通过上面的方法先给这个类一个名字，然后通过上的方法就可以只实例化一次了。

好了上面总结了一下算是我的学习笔记，希望能对大家学习javascript的面向对象化的学习有所帮助，语言描述如有不足或者有疑问，请随时留言给我，谢谢。