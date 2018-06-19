---
title: 深入理解JS原型链与继承
tags:
  - js原型链
  - js继承
id: 602
categories:
  - JS/Jq
date: 2015-07-17 15:00:33
---

[![bjpeg](http://www.npm8.com/wp-content/uploads/2015/07/bjpeg.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/bjpeg.jpeg)

&emsp;&emsp;我觉得阅读精彩的文章是提升自己最快的方法，而且我发现人在不同阶段看待同样的东西都会有不同的收获，有一天你看到一本好书或者好的文章，请记得收藏起来，隔断时间再去看看，我想应该会有很大的收获。其实今天要讨论的主题，有许多人写过许多精彩的文章，但是今天我还是想把自己的理解的知识记录下来。希望我修正后的继承能让更多人对JS有更深的理解。接下来我们从最基本的东西讲到最难的，希望能帮助大家更好的理解。

### 原型写法和用法

```javascript
function Cat(){
    this.Color = "black";
    this.eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var cat1 = new Cat();
cat1.eat(); //吃老鼠
cat1.A(); //Cat A
```
&emsp;&emsp;上面这种写法是我们熟知的工厂模式，这种模式我觉得应该算是标准的原型写法。但是一般我不会使用这种写法，我会用**直接量**来写实现上面的方法，因为使用函数封装方法我个人感觉是很危险的，因为函数写法相当于是一个全局方法，他的执行顺序也是优先级最高的，这种方法不利于在大的项目中管理，所以一般用直接量，**直接量**最大的好处是只有当代码执行到这段代码后才会开始运行。接下来我们修改下上面的代码：
```javascript
var Cat = function(){
    this.Color = "black";
    this.eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var cat1 = new Cat();
cat1.eat(); //吃老鼠
cat1.A(); //Cat A
```

### 使用原型扩展提高性能

&emsp;&emsp;可能很多人会无法理解为什么我们要通过prototype来输入方法，也听过看过很多人说直接使用函数的效率是最低的，但是不知道原理。其实我们拿上面的案例做个简单的实验你或许就能懂了：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B =  function(){
	alert("Cat B");
}
var cat1 = new Cat();
var cat2 = new Cat();
alert(cat1.Eat == cat2.Eat) // false
alert(cat1.A == cat2.A) // true
```
&emsp;&emsp;看到结果是否很震惊，**Eat**和**A**方法都是**Cat**对象里面的，为什么两个实例一对比会产生不同的结果呢？在JS原型链中，通过**prototype**声明的方法会被存入内存中，不管我们实例化多少次**Cat**访问通过**prototype**扩展的**A**或者**B**方法，他们都是去读取同一个内存，但是**Cat**自身的属性和方法却不是这样，而是每次都会跟着实例化，如果该对象被频繁调用，那将会占用大量的内存，这就是为什么我们用**prototype**来扩展我们对象的属性和方法。

### **构造函数**

&emsp;&emsp;上面这两种写法都是标准的原型写法，每个原型都有一个构造函数，每个原型的实例也都有一个构造函数。这个知识点非常的关键，这个构造函数你可以理解为和我们的身份证一样，每个原型构造函数都是唯一的，我们不能随意的去改变他们的身份证。我们来检测下上面的代码的构造函数。
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var cat1 = new Cat();
console.log(Cat.prototype.constructor == Cat); //true
console.log(cat1.constructor == Cat); //true
console.log(cat1.constructor == Cat.prototype.constructor); //true
```
&emsp;&emsp;可能看到上面的有些人会说，你不是说每个构造函数都是一个身份证吗？为啥**cat1**的构造函数和**Cat**构造函数一样呢，坑爹吧。别急，这就是JS这门有趣的原因之一，**cat1**我们专业名词称它是**Cat**的实例，他们的构造函数是共享的。你也可以把**cat1**理解为**Cat**的一个复制品，或者说克隆人。我们可以无限复制**Cat**出来。
```javascript
var cat1 = new Cat();
cat1.Eat(); //吃老鼠
var cat2 = new Cat();
cat2.Eat(); //吃老鼠
```
**Cat**的复制品的构造函数是都指向**Cat**本身的，记住这点。

### 原型继承

&emsp;&emsp;我觉得要正真理解原型链就需要先理解原型继承的原理，理解了如何继承，基本上你就对原型链掌握很深了。我们来实现一个简单的原型继承，我通过阮老师的文章中写的直接继承prototype来实现继承，修改上面的代码：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var Dog = function(){
	this.Weight = "30";
}
Dog.prototype = Cat.prototype;
console.log(Dog.prototype.constructor == Cat); // true
var dog1 = new Dog();
dog1.A(); // Cat A
dog1.B(); // Cat B
```
&emsp;&emsp;上面的代码，我设置了一个Dog来继承**Cat**,我们使用**prototype**来实现继承，实际继承成功了,**Dog**的实例**dog1**调用了**Cat**里面的**prototype**的A和B方法。但是这里出了一个小问题，通过**prototype**继承导致了Dog的构造函数发生了改变，导致它指向了**Cat**，这就是我们代码中**console**输出的原因。我们上面说过每个原型都有一个自己的独立的构造函数，我们却改变了它，这样会导致原型混乱，所以我们必须把**Dog**的构造函数指回**Dog**本身。所以修改下代码：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var Dog = function(){
	this.Weight = "30";
}
Dog.prototype = Cat.prototype;
Dog.prototype.constructor = Dog;
console.log(Dog.prototype.constructor == Cat); // false
console.log(Cat.prototype.constructor == Dog); // true
var dog1 = new Dog();
dog1.A(); // Cat A
dog1.B(); // Cat B
```
&emsp;&emsp;上面我通过**Dog.prototype.constructor = Dog;**这句话把**Dog**构造函数指回自己了，但是坑爹的是这样做之后，原先的Cat的构造函数也被改变成了**Dog**，唉，这是要闹哪样，完全坑爹，所以这种继承方式也是失败的，但是我们已经接近成功了，阮老师后面提出了利用空对象作为中介来继承。好的的直接上代码：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var Dog = function(){
	this.Weight = "30";
}

var Fn = function(){};
Fn.prototype = Cat.prototype;
Dog.prototype = new Fn();
Dog.prototype.constructor = Dog;
console.log(Dog.prototype.constructor == Dog); // true
console.log(Cat.prototype.constructor == Cat); // true
var dog1 = new Dog();
dog1.A(); // Cat A
dog1.B(); // Cat B
```
&emsp;&emsp;这下实现完美的继承了，上面是我根据阮老师的提供的方式实现的一个继承，Dog不止继承了Cat里面的prototype的方法，而且构造函数还是指回自己，Cat的构造函数也没被篡改。貌似非常完美的继承。但.....

### prototype继承缺陷

&emsp;&emsp;上面的通过原型继承看起来很完美，但是还是有缺陷，并不是说@阮老师的方法有问题，他的继承方法是没问题的，但是只能针对空对象继承。

&emsp;&emsp;实际上通过prototype继承，他只能继承对象通过prototype的属性和方法，他无法继承对象本身的属性，举个例子：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var Dog = function(){
	this.Weight = "30";
}
var Fn = function(){};
Fn.prototype = Cat.prototype;
Dog.prototype = new Fn();
Dog.prototype.constructor = Dog;
console.log(Dog.prototype.constructor == Dog); // true
console.log(Cat.prototype.constructor == Cat); // true
var dog1 = new Dog();
dog1.A(); // Cat A
dog1.B(); // Cat B
console.log(dog1.Color);//undefined
dog1.Eat();//has no method 'Eat'
```
&emsp;&emsp;我们在之前的代码里面调用了我们继承**Cat**的方法和属性，但是只有**Cat**里面的**A**和**B**方法被调用成功了，但是**Cat**的自身属性里面的**Color**和**Eat**方法都没调用成功，说明咱们根本没有继承到他自身的属性，只继承了通过**prototype**扩展的方法，这就是JS原型链的奇特现象之一，这种原型继承的缺陷貌似阮一峰老师也没发现。

所以我针对上面的方法做了些修改：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B = function(){
	alert("Cat B");
};
var Dog = function(){
	this.Weight = "30";
}
Dog.prototype = new Cat();
Dog.prototype.constructor = Dog;
console.log(Dog.prototype.constructor == Dog); // true
console.log(Cat.prototype.constructor == Cat); // true
var dog1 = new Dog();
alert(Dog.Weight);// 30
dog1.A(); // Cat A
dog1.B(); // Cat B
alert(dog1.Color);//black
dog1.Eat();//吃老鼠
```
&emsp;&emsp;上面的我将继承者**Dog**的原型直接指向了**Cat**的实例，然后再将**Dog**的构造函数指回本身，这样就可以实现完整的继承了，**Dog**不仅仅继承了**Cat**的**prototype**而已还继承了**Cat**本身自带的属性和方法。在上面中我们知道**Cat**的实例**cat1**其实就是包含了**Cat**所有的属性和方法，他不会区分你是不是在原型中的方法还是在自身中的方法，都会完全被复制到实例中，所以我们直接去继承实例，这样子就可以直接获取到**Cat**中所有的方法和属性。而且直接继承实例我感觉也更加安全且高效，因为不去直接操作原型本身，只是操作原型实例。

### 通过深拷贝实现完美继承

&emsp;&emsp;其实上面的方法离完美的继承方式还是存在着一个缺陷的。我们的的继承者**Dog**如果他现在里面存在着原型方法的时候，我们又想让她保留现在的原型方法情况下，还可以去继承**Cat**里面的所有方法怎么办，用上面的方法是无法实现的，请看代码：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype ={
	A:function(){
		alert("Cat A");
	},
	B:function(){
		alert("Cat B");
	}
}
var Dog = function(){
	this.Weight = "30";
}
Dog.prototype.testDog = function(){
	alert("test Dog");
}

Dog.prototype = new Cat();
Dog.prototype.constructor = Dog;

var dog1 = new Dog();
alert(dog1.Weight);//30
dog1.testDog();//has no method 'testDog'
```
&emsp;&emsp;看上面的代码，我只是在继承者**Dog**的原型里面添加了一个**testDog**的方法，然后**Dog**用我们上面的方法去继承**Cat**后，**Dog**自身的属性**Weight**在继承**Cat**的过程中也被保留下来了，但是**Dog**存在原型链中的**testDog**却在继承过程中被干掉了，无言，心碎。这个时候我想到了阮一峰老师的拷贝继承，他的拷贝继承依然是存在的缺陷，但是我直接改进了他的方法，那样实现了完美的继承：
```javascript
var Cat = function(){
    this.Color = "black";
    this.Eat = function(){
    	alert("吃老鼠");
    };
}
Cat.prototype.A = function(){
	alert("Cat A");
};
Cat.prototype.B =  function(){
	alert("Cat B");
}
var Dog = function(){
	this.Weight = "30";
}
Dog.prototype.testDog = function(){
	alert("test Dog");
}
var extend = function(Child,Parent){
	var p = new Parent();
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}
//用我们写好的继承方法执行继承
extend(Dog,Cat);
var dog1 = new Dog();
dog1.A(); // Cat A
dog1.Eat(); // 吃老鼠
dog1.testDog(); // test Dog
alert(dog1.Weight); // 30
```
&emsp;&emsp;其实上面我们**extend**方法中我只是通过了**for..in**去遍历**Cat**生成的实例中的所有属性和方法，然后将这些值复制到我们的**Dog**中，这样子就可以实现保留本身属性又继承，这种方法是应该算是最优的解决方法。