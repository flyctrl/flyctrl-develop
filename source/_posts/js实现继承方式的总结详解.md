---
title: js实现继承方式的总结详解
tags:
  - js继承
  - js继承总结
  - js继承详解
id: 1082
categories:
  - JS/Jq
date: 2015-08-01 14:44:51
---

js是门灵活的语言，实现一种功能往往有多种做法,ECMAScript没有明确的继承机制，而是通过模仿实现的，根据js语言的本身的特性,js实现继承有以下通用的几种方式

**1、使用对象冒充实现继承(该种实现方式可以实现多继承)**

实现原理:让父类的构造函数成为子类的方法,然后调用该子类的方法,通过this关键字给所有的属性和方法赋值
```javascript
function Parent(firstname)
{
    this.fname=firstname;
    this.age=40;
    this.sayAge=function()
    {
        console.log(this.age);
    }
}
function Child(firstname)
{
    this.parent=Parent;
    this.parent(firstname);
    delete this.parent;
    this.saySomeThing=function()
    {
        console.log(this.fname);
        this.sayAge();
    }
}
var mychild=new  Child("李");
mychild.saySomeThing();
```

**2、采用call方法改变函数上下文实现继承(该种方式不能继承原型链,若想继承原型链，则采用5混合模式)**

实现原理:改变函数内部的函数上下文this,使它指向传入函数的具体对象
```javascript
function Parent(firstname)
{
    this.fname=firstname;
    this.age=40;
    this.sayAge=function()
    {
        console.log(this.age);
    }
}
function Child(firstname)
{

    this.saySomeThing=function()
    {
        console.log(this.fname);
        this.sayAge();
    }
   this.getName=function()
   {
       return firstname;
   }

}
var child=new Child("张");
Parent.call(child,child.getName());
child.saySomeThing();
```

**3、采用Apply方法改变函数上下文实现继承(该种方式不能继承原型链,若想继承原型链，则采用5混合模式)**

实现原理:改变函数内部的函数上下文this,使它指向传入函数的具体对象
```javascript
function Parent(firstname)
{
    this.fname=firstname;
    this.age=40;
    this.sayAge=function()
    {
        console.log(this.age);
    }
}
function Child(firstname)
{

    this.saySomeThing=function()
    {
        console.log(this.fname);
        this.sayAge();
    }
    this.getName=function()
    {
        return firstname;
    }

}
var child=new Child("张");
Parent.apply(child,[child.getName()]);
child.saySomeThing();
```

**4、采用原型链的方式实现继承**

实现原理:使子类原型对象指向父类的实例以实现继承,即重写类的原型,弊端是不能直接实现多继承
```javascript
function Parent()
{

    this.sayAge=function()
    {
        console.log(this.age);
    }
}
function Child(firstname)
{
    this.fname=firstname;
    this.age=40;
    this.saySomeThing=function()
    {
        console.log(this.fname);
        this.sayAge();
    }
}

Child.prototype=new  Parent();
var child=new Child("张");
child.saySomeThing();
```

**5、采用混合模式实现继承**
```javascript
function Parent()
{

    this.sayAge=function()
    {
        console.log(this.age);
    }
}

Parent.prototype.sayParent=function()
{
   alert("this is parentmethod!!!");
}

function Child(firstname)
{
    Parent.call(this);
    this.fname=firstname;
    this.age=40;
    this.saySomeThing=function()
    {
        console.log(this.fname);
        this.sayAge();
    }
}

Child.prototype=new  Parent();
var child=new Child("张");
child.saySomeThing();
child.sayParent();
```
&nbsp;