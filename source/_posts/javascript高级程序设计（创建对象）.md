---
title: Javascript高级程序设计（创建对象）
tags:
  - js创建对象
  - js设计模式
id: 1095
categories:
  - JS/Jq
date: 2015-08-03 10:06:45
---

**一：工厂模式**

```javascript
function createPerson(name,age,job){
var o = new Object();
o.name = name;
o.age = age;
o.sayName = function(){
console.log(this.name);
}
return o;
}
```
//创建对象： var person = createPerson("Tom",10,"student");

**二：构造函数模式**

```javascript
function Person(name,age,job){
this.name = name;
this.age = age;
this.job = job;
this.sayName = function{
console.log(this.name);
}
}
```
//创建对象： var person = new Person("Peter",20,"engineer");

//没有显示地创建对象；直接将属性和方法赋给了this对象；没有return 语句；

//使用new 来创建实例对象(
1.创建一个新对象

2.将构造函数的作用域赋给新对象,即this指向新对象 

3.执行构造函数中的代码 4.返回新对象)

**三：原型模式**

```javascript
function Person(){}
Person.prototype.name = "Mary";
Person.prototype.age = 18;
Person.prototype.job = "teacher";
Person.prototype.sayName = function(){console.log(this.name);}
```

//创建对象：var person = new Person();

**四：组合使用构造函数模式和原型模式**

```javascript
function Person(name,age,job){
this.name = name;
this.age = age;
this.job = job;
this.friends = ["tom","peter"];
}

Person.prototype = {
constructor:Person, //以这种方式重写原型链需要绑定constructor，让其prototype重新指向person
sayName : function(){console.log(this.name);}
}
```

**五：动态原型模式**

```javascript
function Person(name,age,job){
//Attribute
this.name = name;
this.age = age;
this.job = job;
//method

if(typeof this.sayName != "function"){
//判断如果不存在sayName方法就在原型链上添加此方法，这里对原型所做的修改能立即在所有实例中得到反映
Person.prototype.sayName = function(){console.log(this.name);};
}
}
```

**六：寄生构造函数模式**

```javascript
function Person(name,age,job){
var o = new Object();
o.name = name;
o.age = age;
o.job = job;
o.sayName = function(){
console.log(this.name);
}
return o;
}
```
//发挥的对象与构造函数或者与构造函数的原型属性之间没有关系，不能依赖instanceof操作符来确定对象类型

**七：稳妥构造函数模式**

```javascript
function Person(name,age,job){
var o = new Object();
o.sayName = function(){console.log(this.name);};
return o;
}
```
//创建对象：var friend = Person("Tom",29,"eigneer");
//只能通过调用sayName方法获得name的值，安全性高
&nbsp;