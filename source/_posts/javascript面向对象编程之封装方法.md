---
title: javascript面向对象编程之封装方法
tags:
  - js封装方法
id: 588
categories:
  - JS/Jq
date: 2015-07-17 13:36:35
---

[![1401432158](http://www.npm8.com/wp-content/uploads/2015/07/1401432158.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/1401432158.jpeg)

Javascript是一种基于对象（object-based）的语言，你遇到的所有东西几乎都是对象。但是，它又不是一种真正的面向对象编程（OOP）语言，因为它的语法中没有class（类）。

但是如果要把"属性"（property）和"方法"（method），封装成一个对象，甚至要从原型对象生成一个实例对象，应该怎么做呢？今天我就简单给大家解释一下方法。

### 1、生成对象的原始模式

假定我们把狗看成一个对象，它有"名字"和"颜色"两个属性。
```javascript
var Dog = {
    name:'',
　　color:''
}
```
现在，我们需要根据这个原型对象的规格（schema），生成两个实例对象。
```javascript
var Dog1 = {}; // 创建一个空对象
　　Dog1.name = "大黄"; // 按照原型对象的属性赋值
　　Dog1.color = "黄色";
var Dog2 = {};
　　Dog2.name = "二黄";
　　Dog2.color = "黑色";
```
好了，这就是最简单的封装了，把两个属性封装在一个对象里面。但是，这样的写法有两个缺点：

1.  是如果多生成几个实例，写起来就非常麻烦
2.  是实例与原型之间，没有任何办法，可以看出有什么联系。

### 2.原始模式的改进

我们可以写一个函数，解决代码重复的问题。
```javascript
function Dog(name,color){
　　return {
　　    name:name,
　　　　color:color
　　}
}
```
然后生成实例对象，就等于是在调用函数：
```javascript
var dog1 = Dog("大黄","黄色");
var dog2 = Dog("二黄","黑色");
```
这种方法的缺点还是dog1和cat2之间并没有内在的联系，不能反映出它们是同一个原型对象的实例。

### 3.构造函数模式

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了this变量。对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上。

例如：狗的原型对象现在可以这样写：
```javascript
function Dog(name,color){
　　this.name=name;
　　this.color=color;
}
```
我们现在就可以生成实例对象了。
```javascript
var Dog1 = new Dog("大黄","黄色");
var Dog2 = new Dog("二黄","黑色");
alert(Dog1.name); // 大毛
alert(Dog1.color); // 黄色
```
这时Dog1和Dog2会自动含有一个constructor属性，指向它们的构造函数。
```javascript
alert(Dog1.constructor == Dog); //true
alert(Dog2.constructor == Dog); //true
```
其实Javascript还提供了一个instanceof运算符，验证原型对象与实例对象之间的关系。
```javascript
alert(Dog1 instanceof Dog); //true
alert(Dog2 instanceof Dog); //true
```

### 4.构造函数模式的问题

构造函数方法很好用，但是存在一个浪费内存的问题。

请看，我们现在为Dog对象添加一个不变的属性"type"（种类），再添加一个方法eat（吃老鼠）。那么，原型对象Dog就变成了下面这样：
```javascript
function Dog(name,color){
　　this.name = name;
　　this.color = color;
　　this.type = "四条腿的动物";
　　this.eat = function(){alert("狗喜欢欺负猫");};
}
```
还是采用同样的方法，生成实例：
```javascript
var Dog1 = new Dog("大黄","黄色");
var Dog2 = new Dog ("二黄","黑色");
alert(Dog1.type); // 四条腿的动物
Dog1.eat(); // 狗喜欢欺负猫
```
表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。
```javascript
alert(cat1.eat == cat2.eat); //false
```
那有没有能让type属性和eat()方法在内存中只生成一次，然后所有实例都指向那个内存地址呢？当然可以：

### 5.Prototype模式

Javascript规定，每一个构造函数都有一个prototype属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。

这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。
```javascript
function Dog(name,color){
　　this.name = name;
　　this.color = color;
}
Dog.prototype.type = "四条腿的动物";
Dog.prototype.eat = function(){alert("狗喜欢欺负猫")};
```
然后，生成实例。
```javascript
var Dog1 = new Dog("大黄","黄色");
var Dog2 = new Dog ("二黄","黑色");
alert(Dog1.type); // 四条腿的动物
Dog1.eat(); // 狗喜欢欺负猫
```
这时所有实例的type属性和eat()方法，其实都是同一个内存地址，指向prototype对象，因此就提高了运行效率。
```javascript
alert(Dog1.eat == Dog2.eat); //true

```

### 6.Prototype模式的验证方法

为了配合prototype属性，Javascript定义了一些辅助方法，帮助我们使用它。

isPrototypeOf()

这个方法用来判断，某个proptotype对象和某个实例之间的关系。
```javascript
alert(Dog.prototype.isPrototypeOf(Dog1)); //true
alert(Dog.prototype.isPrototypeOf(Dog2)); //true

```
hasOwnProperty()

每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
```javascript
alert(Dog1.hasOwnProperty("name")); // true
alert(Dog1.hasOwnProperty("type")); // false

```
in运算符

in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
```javascript
alert("name" in Dog1); // true
alert("type" in Dog1); // true
```
in运算符还可以用来遍历某个对象的所有属性。
```javascript
for(var prop in Dog1) { alert("Dog1["+prop+"]="+Dog1[prop]); }
```
以上只是我的浅解，希望对大家学习JS面向对象编程有所帮助！