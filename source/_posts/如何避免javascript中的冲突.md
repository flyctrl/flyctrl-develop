---
title: 如何避免javascript中的冲突
tags:
  - 如何避免js中的冲突
id: 1600
categories:
  - JS/Jq
date: 2015-09-10 13:14:04
---

==[1]工程师甲编写功能A==
```javascript
var a = 1;
var b = 2;
alert(a+b);//3
```

==[2]工程师乙添加新功能B==
```javascript
var a = 2;
var b = 1;
alert(a-b);//1
```

==[3]上一步中,工程师乙在不知情的情况下,定义了同名变量a,产生冲突。于是使用匿名函数将脚本包起来,让变量作用域控制在匿名函数之内。==
```javascript
//功能A
(function(){
　　var a = 1;
　　var b = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　var a = 2;
　　var b = 1;
　　alert(a-b);//1
})();
```

==[4]此时有了新需求,网页中加入功能C,且需要用到功能A中的变量b。于是在window作用域下定义一个全局变量,把它作为一个桥梁,完成各匿名函数之间的通信==
```javascript
//全局变量
var str;
//功能A
(function(){
　　var a = 1;
　　//将b的值赋给str
　　var b = str = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　var a = 2;
　　var b = 1;
　　alert(a-b);//1
})();
//功能C
(function(){
　　//将str的值赋给b
　　var b = str;
　　alert(b);//2
})();
```

==[5]但如果功能C还需要功能A中的变量a呢,这时就需要再定义一个全局变量==
```javascript
//全局变量
var str,str1;
//功能A
(function(){
　　//将a的值赋给str1
　　var a = str1 = 1;
　　//将b的值赋给str
　　var b = str = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　var a = 2;
　　var b = 1;
　　alert(a-b);//1
})();
//功能C
(function(){
　　//将str1的值赋给a
　　var a = str1;
　　//将str的值赋给b
　　var b = str;
　　alert(a*b);//2
})();
```

==[6]但随着匿名函数之间需要通信的变量越多,需要的全局变量也就越多。因此需要严格控制全局变量的数量,使用hash对象作为全局变量,可以将需要的变量都作为对象的属性,可以保证全局变量的个数足够少,同时拓展性非常好==
```javascript
//全局变量
var GLOBAL = {};
//功能A
(function(){
　　//将a的值赋给GLOBAL.str1
　　var a = GLOBAL.str1 = 1;
　　//将b的值赋给GLOBAL.str
　　var b = GLOBAL.str = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　var a = 2;
　　var b = 1;
　　alert(a-b);//1
})();
//功能C
(function(){
　　//将GLOBAL.str1的值赋给a
　　var a = GLOBAL.str1;
　　//将GLOBAL.str的值赋给b
　　var b = GLOBAL.str;
　　alert(a*b);//2
})();
```

==[7]但如果新增功能D,功能D需要和功能B通信,并使用功能B脚本中的变量a,开发功能D的是工程师丁==
```javascript
//全局变量
var GLOBAL = {};
//功能A
(function(){
　　//将a的值赋给GLOBAL.str1
　　var a = GLOBAL.str1 = 1;
　　//将b的值赋给GLOBAL.str
　　var b = GLOBAL.str = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　//将a的值赋给GLOBAL.str1
　　var a = GLOBAL.str1 = 2;
　　var b = 1;
　　alert(a-b);//1
})();
//功能C
(function(){
　　//将GLOBAL.str1的值赋给a
　　var a = GLOBAL.str1;
　　//将GLOBAL.str的值赋给b
　　var b = GLOBAL.str;
　　alert(a*b);//2
})();
//功能D
(function(){
　　//将GLOBAL.str1的值赋给a
　　var a = GLOBAL.str1;
　　alert(a*2);//4
})();
```

==[8]由于工程师丁只关心自己的匿名函数和功能B的匿名函数，使用GLOBAL.str却无意中覆盖了功能A中设置的同名变量,导致功能C出错。于是使用命名空间来解决这个问题，在不同的匿名函数下,根据功能声明一个不同的命名空间,然后每个匿名函数中的GLOBAL对象的属性都不要直接挂在GLOBAL对象上,而是挂在此匿名函数的命名空间下==
```javascript
//全局变量
var GLOBAL = {};
//功能A
(function(){
　　GLOBAL.A = {};
　　//将a的值赋给GLOBAL.A.str1
　　var a = GLOBAL.A.str1 = 1;
　　//将b的值赋给GLOBAL.A.str
　　var b = GLOBAL.A.str = 2;
　　alert(a+b);//3
})();
//功能B
(function(){
　　GLOBAL.B = {};
　　//将a的值赋给GLOBAL.B.str1
　　var a = GLOBAL.B.str1 = 2;
　　var b = 1;
　　alert(a-b);//1
})();
//功能C
(function(){
　　//将GLOBAL.A.str1的值赋给a
　　var a = GLOBAL.A.str1;
　　//将GLOBAL.A.str的值赋给b
　　var b = GLOBAL.A.str;
　　alert(a*b);//2
})();
//功能D
(function(){
　　//将GLOBAL.B.str1的值赋给a
　　var a = GLOBAL.B.str1;
　　alert(a*2);//4
})();
```

==[9]如果同一个匿名函数中的程序非常复杂,变量名很多,命名空间还可以进一步拓展,生成二级命名空间==
```javascript
//以功能A为例
(function(){
　　var a = 1, b = 2;
　　GLOBAL.A = {};
　　GLOBAL.A.CAT = {};
　　GLOBAL.A.DOG = {};
　　GLOBAL.A.CAT.name = 'mimi';
　　GLOBAL.A.DOG.name = 'xiaobai';
　　GLOBAL.A.CAT.move = function(){};
　　GLOBAL.A.str1 = a;
　　GLOBAL.B.str = b;    
})();
```

==[10]因为生成命名空间是个非常常用的功能,进一步将生成命名空间的功能定义成一个函数,方便调用,完整版本改写后的代码如下==
```javascript
var GLOBAL = {};
GLOBAL.namespace = function(str){
　　var arr = str.split('.');
　　var o = GLOBAL;
　　var start = 0;
　　if(arr[0] == 'GLOBAL'){
　　　　start = 1;
　　}else{
　　　　start = 0;
　　}
　　for(var i = start; i < arr.length; i++){
　　　　o[arr[i]] = o[arr[i]] || {};
　　　　o = o[arr[i]];
　　}
};
//功能A
(function(){
　　var a = 1;
　　var b = 2;
　　GLOBAL.namespace = {'A.CAT'};
　　GLOBAL.namespace = {'A.DOG'};
　　GLOBAL.A.CAT.name = 'mimi';
　　GLOBAL.A.DOG.name = 'xiaobai';
　　GLOBAL.A.CAT.move = function(){};
　　GLOBAL.A.str1 = a;
　　GLOBAL.B.str = b;    
　　alert(a+b);//3
})();
//功能B
(function(){
　　var a = 2;
　　var b = 1;
　　GLOBAL.namespace = {'B'};
　　GLOBAL.B.str1 = a;
　　alert(a-b);//1
})();
//功能C
(function(){
　　var a = GLOBAL.A.str1;
　　var b = GLOBAL.A.str;
　　alert(a*b);//2
})();
//功能D
(function(){
　　var a = GLOBAL.B.str1;
　　alert(a*2);//4
})();
```

==[11]代码的冲突问题已经解决了,但可维护性并不强。比如,现在需要让工程师甲去修改功能B。因为工程师甲写的脚本是关于功能A的,他并不知道功能B的脚本情况。为了改善这种局面,需要给代码添加适当的注释。==
```javascript
var GLOBAL = {};
GLOBAL.namespace = function(str){
　　var arr = str.split('.');
　　var o = GLOBAL;
　　var start = 0;
　　if(arr[0] == 'GLOBAL'){
　　　　start = 1;
　　}else{
　　　　start = 0;
　　}
　　for(var i = start; i < arr.length; i++){
　　　　o[arr[i]] = o[arr[i]] || {};
　　　　o = o[arr[i]];
　　}
};
/*
* @method 功能A:实现加法运算
* @author 工程师甲
* @connect 1234567
* @time 2015-01-01
*/

(function(){
　　var a = 1;
　　var b = 2;
　　GLOBAL.namespace = {'A.CAT'};
　　GLOBAL.namespace = {'A.DOG'};
　　GLOBAL.A.CAT.name = 'mimi';
　　GLOBAL.A.DOG.name = 'xiaobai';
　　GLOBAL.A.CAT.move = function(){};
　　GLOBAL.A.str1 = a;
　　GLOBAL.B.str = b;    
　　alert(a+b);//3
})();
/*
* @method 功能B:实现减法运算
* @author 工程师乙
* @connect 1234567
* @time 2015-01-01
*/
(function(){
　　var a = 2;
　　var b = 1;
　　GLOBAL.namespace = {'B'};
　　GLOBAL.B.str1 = a;
　　alert(a-b);//1
})();
/*
* @method 功能C:实现乘法运算
* @author 工程师丙
* @connect 1234567
* @time 2015-01-01
*/
(function(){
　　var a = GLOBAL.A.str1;
　　var b = GLOBAL.A.str;
　　alert(a*b);//2
})();
/*
* @method 功能D:实现乘2运算
* @author 工程师丁
* @connect 1234567
* @time 2015-01-01
*/
(function(){
　　var a = GLOBAL.B.str1;
　　alert(a*2);//4
})();
```

*让javascript不再冲突,需要*

**[1]避免全局变量的泛滥**

**[2]合理使用命名空间**

**[3]为代码添加必要的注释**