---
title: JavaScript中的string拥有方法(Method)的原因
tags:
  - JavaScript中的string拥有方法(Method)的原因
id: 1647
categories:
  - JS/Jq
date: 2015-09-15 16:58:32
---

我们都知道，JavaScript数据类型分两大类，基本类型（或者称原始类型）和引用类型。

基本类型的值是保存在栈内存中的简单数据段，它们是按值访问的。JS中有五种基本类型：Undefined、Null、Boolean、Number和String。

引用类型的值是保存在堆内存中的对象，它的值是按引用访问的。引用类型主要有Object、Array、Function、RegExp、Date。

对象是拥有属性和方法的，所以我们看到下面这段代码一点也不奇怪.
```javascript
var favs=['鸡蛋','莲蓬'];
favs.push('秋葵');
console.log(favs);//["鸡蛋", "莲蓬", "秋葵"]
console.log(favs.length);//3
```
Array是引用类型，所以它自然可以拥有属性(length)和方法(push)，这天经地义地就像夏天一定要吃冰淇淋一样。但是，再看下面的代码，仔细想想，这这这，合法吗？
```javascript
var realMessage="Said I love you but I lied";
var myMessage=realMessage.substring(5,15);
console.log(myMessage); //"I love you"
```
有一个心碎的女纸任性地对一个用来分手的字符串任性地执行了“substring”方法，然后开心地看着剪辑版睡过去了。可是可是可是，不是说string是基本类型吗，为什么它可以拥有方法？？还有没有王法啊青天大老爷！

其实，这一切，都是因为有个叫“基本包装类型”的东东。这个基本包装类型特别耿直，是真正的“事了拂衣去，深藏功与名”！

### **基本包装类型**

除了一开始提到的Object、Array等引用类型，JavaScript还为我们提供了三种特殊的引用类型：String、Number和Boolean，方便我们操作对应的基本类型。

继续看上面的剪辑字符串的例子，有没有注意到，尽管使用了substring方法，realMessage本身的值是不会变的，调用这个方法只是返回了一个新的字符串。

这就是基本包装类型的作用了。本来你是没有方法的，但是你想用方法的时候，你尽管调，对应的基本包装类型有这个方法就行。例如上面的substring方法，string这个基本类型是不可能有这个方法的，但是String这个包装类型有啊，它会吭吭哧哧地把这个方法执行完把结果返回。在执行到：

这行代码时，发生了很多事。

首先，它会从内存中读取realMessage的值。当处于这种读取模式下的时候，后台就开始干活了。JS高程是这样描述后台完成的这些动作的：

1.创建String类型的一个实例；

2.在实例上调用指定的方法；

3.销毁这个实例

上面的例子可以用这样的代码来说明：

所以，这样我们就明白了，并不是基本类型string执行了自身方法，而是后台为它创建了一个对应的基本包装类型String，它根据基本类型的值实例化出了一个实例，让这个实例去调用指定方法，最后销毁自己，感天动地有木有。

注意最后一步基本包装类型“会销毁”的特性，这决定了我们不能为基本类型值添加自定义属性和方法。

我给“me“这个字符串添加了age属性，值设为美好的18岁，然并卵，再次访问时，这个属性已经渺无踪迹了。这是因为:

执行到第二行代码属性赋值时，后台创建了一个基本包装类型的实例，这个age属性确实挂到实例上去了，但是紧跟着，这个实例就被销毁了。执行到第三行时，又重新创建了新的基本包装类型的实例，自然是没有age属性的。

### **显示使用基本包装类型**

除了在字符串处于读取模式下，后台会帮我们创建基本包装类型实例时，我们自己也可以显示地创建。
```javascript
var str=new String("hello");
var str2=str.toUpperCase();
console.log(str2);//"HELLO:
```
这样与后台帮我们创建时变量中保存的东西是不同的。
```javascript
var str1=new String("hello");
var str2="hello";
typeof str1 //"object"
typeof str2 //"string"
```
&nbsp;

### **总结**

多亏了有基本包装类型，我们操作string、boolean、number这三种基本类型更方便了。每当读取这三种基本类型值时，后台会创建对应的包装类型实例，这个实例会调用指定方法，调用完会被销毁。这种短暂的生命周期决定了我们不能为基本类型添加自定义的属性和方法。

**我们再来看下javascript中String类的subString()方法和slice()方法**

最近在看《Javascript高级程序设计》一书，在书中发现一些以前没有接触过的且比较实用的技巧和知识点，想通过博客记录一下，以加深记忆。
```javascript
var strObj = new String("hello world");
alert(strObj.slice(3));    　　// 输出结果："ol world"
alert(strObj.subString(3));  　　// 输出结果："ol world"
alert(strObj.slice(3, 7));    // 输出结果："lo w"
alert(strObj.subString(3,7));   // 输出结果："lo w"
```
由以上代码的输出结果可已看出，slice()方法和subString()方调用方法法和输出结果完全一样，这两种方法返回的都是要处理的字符串的子串，都接受一个或两个参数，第一个参数是要获取的子串的起始位置，第二个参数是要获取子串的终止位置，如果第二个参数省略终止位置就默认为字符串的长度，且两个方法都不改变String对象自身的值。

为什么有两个功能完全相同的方法呢？事实上，这两个方法并不完全相同，不过只在参数为负值时，他们处理参数的方式稍有不同。

对于负数参数，slice()方法会用字符串的长度加上参数，subString()方法将其作为0处理，例如：
```javascript
var strObj = new String("hello world");
alert(strObj.slice(-3));　　　　　　// 输出结果："rld"
alert(strObj.subString(-3));　　　 // 输出结果："hello world"
alert(strObj.slice(3,-4));　　　　 // 输出结果："lo w"
alert(strObj.subString(3,-4))　　 // 输出结果："hel"
```
这样既可看到slice()和subString()方法的主要不同。当只有参数-3时，slice()返回"rld"，subString()则返回"hello world"。这是因为对于字符串"hello world"，slice(-3)将被转换成slice(8)，而subString(-3)则转化成subString(0)。同样，使用3和-4差别也是很明显。slice()方法将被转换成slice(3,7)，与前面的例子相同，返回"lo w"。而subString()方法则将这个两个参数解释为subString(0,3)，实际上是：subString(0,3)，因为subString()总是把较小的参数作为起始位，较大的数字最为终止位。