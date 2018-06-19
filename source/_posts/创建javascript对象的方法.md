---
title: 创建javascript对象的方法
tags:
  - 创建js对象
id: 1198
categories:
  - JS/Jq
date: 2015-08-06 17:06:02
---

## 一、工厂模式
```javascript
function person (name,age) {
    var p=new Object();
    p.name=name;
    p.age=age;
    p.showMessage=function(){
        console.log("name:"+this.name+" age:"+this.age);
    }
    return p;
}
var p1=person("k1",28);
var p2=person("k2",29);
console.log(p1.showMessage==p2.showMessage);//false  不是同一个showMessage方法
console.log(p1.constructor);//[object]  都是object
```
&emsp;工厂模式的缺陷是：没解决对象识别的问题，而且每个对象的showMessage方法都不是同一个方法（每个方法在每个对象实例上都重新创建了一遍），增加了开销
&nbsp;

## 二、构造函数模式
```javascript
function Person (name,age) {
    this.name=name;
    this.age=age;
    this.showMessage=function(){
        console.log("name:"+this.name+" age:"+this.age);
    }
}
var p1=new Person("k1",28);
var p2=new Person("k2",29);
console.log(p1.showMessage==p2.showMessage);//false  不是同一个showMessage方法
console.log(p1.constructor);//[Person]
console.log(p1 instanceof Person);// true
```
&emsp;&emsp;构造函数模式解决了对象识别的问题，但是每个对象的showMessage方法不是同一个方法（每个方法在每个对象实例上都重新创建了一遍），增加了开销

## 三、原型模式
```javascript
function Person () {

}
Person.prototype.name ="k";
Person.prototype.age =29;
Person.prototype.showMessage=function () {
    console.log("name:"+this.name+" age:"+this.age);
};

var p1=new Person();
p1.showMessage();//name:k age:29

var p2=new Person();
p2.showMessage();//name:k age:29

console.log(p1.showMessage==p2.showMessage);// true --引用的是同一函数
console.log(p1.constructor)//[Person]  --对象识别
console.log(p1 instanceof Person)//true  --对象识别
console.log(Person.prototype.isPrototypeOf(p1));// true
console.log(Object.getPrototypeOf(p1)==Person.prototype);// true
```
&emsp;&emsp;原型模式解决了“每个方法在每个对象实例上都重新创建了一遍”的问题，也解决了对象识别的问题
原型模式有个很大的问题是，因为挂载在函数prototype下面的所有对象、变量、函数都是被该函数的所有实例共享的，虽然通过实例p1、p2可以访问到prototype的属性，但是却不能修改属性值，例如p1.name="k1"，只是在p1实例上添加了一个name="k1"的属性，并没改到prototype.name。如果是值类型还好，如果是引用类型的话，就会有问题了，看如下的例子
```javascript
function Person () {    
};
Person.prototype.age =10;
Person.prototype.array=[1,2,3];

var p1=new Person();
var p2=new Person();
console.log(p1.array);// [1,2,3]
console.log(p2.array); //[1,2,3]
p1.array.push(4);
console.log(p1.array);//[1,2,3,4]
console.log(p2.array);//[1,2,3,4]
```
p1往array里面添加了值，在p2也反映出来了，因为他们都是指向同一个array
&nbsp;

## 四、组合使用构造函数模式和原型模式
这是最常见的创建对象的方式，结合了构造函数和原型模式的优点
```javascript
function Person (name,age) {
    this.name=name;
    this.age=age;
}

Person.prototype.showMessage = function() {
    console.log("name:"+this.name+" age:"+this.age);
};

var p1=new Person("k",30);
p1.showMessage();
```

## 五、动态原型模式
主要是解决：把所有的信息都封装在构造函数中，更符合oo的思想
```javascript
function Person (name,age) {
    this.name=name;
    this.age=age;
    if(typeof this.showMessage!="function"){
        Person.prototype.showMessage=function(){
            console.log("name:"+this.name+" age:"+this.age);
        }
    }
}

var p1=new Person("k",30);
p1.showMessage();
```

## 六、寄生构造函数模式
```javascript
function Person (name,age) {
    var o=new Object();
    o.name=name;
    o.age=age;
    o.sayName=function(){
        console.log(this.name);
    };
    return o;
}
var p1=new Person("k",28);
p1.sayName();
```
&emsp;&emsp;寄生构造函数模式和工厂模式是一模一样的，只不过创建对象的时候使用了new 关键字，上例：var p1=new Person("k",28)。
它的主要作用是：在这个构造函数里面进行功能的扩展，例如，我想定义一个数组类型MyArray，它是以Array数组为基础的，有一个自己的方法，如下
```javascript
function MyArray(){
    var values=new Array();
    values.push.apply(values,arguments);
    //自己定义的方法
    values.toPipedString=function(){ 
        return this.join('|');
    };
    return values;
}
var colors=new MyArray("red","blue","green");
console.log(colors.toPipedString());
console.log(colors instanceof Array);
```
## 七、稳妥构造函数模式
&emsp;&emsp;稳妥构造函数遵循与寄生构造函数类型的模式，但有两点不同：一是不使用this，二是不使用new 调用构造函数
```javascript
function Person (name,age) {
    var o=new Object();
    var tempAge=age;

    o.name=name;
    o.age=age;

    o.sayName=function(){
        console.log(name);
    }
    o.sayAge=function(){
        console.log(tempAge);
    }
    return o;
}

var p1=Person("k1",28);
p1.sayName(); // k1
p1.sayAge(); // 28

p1.name="k2";
p1.age=30;
p1.sayName();  // k1
p1.sayAge();   //28
```
&emsp;&emsp;看到如上的输出就很好理解什么叫稳妥对象模式了，就是用这种模式创建的对象，没有其他办法能够改变初始化时候传入的值，这里是Person("k1",28)，这样的对象就是稳妥对象，实际上这里使用到就是javascript的闭包了。
&nbsp;