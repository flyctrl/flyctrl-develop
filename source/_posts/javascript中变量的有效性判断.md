---
title: JavaScript中变量的有效性判断
tags:
  - JavaScript中变量的有效性判断
  - undefined 和 null区别
id: 2324
categories:
  - JS/Jq
date: 2016-04-20 09:57:41
---

JavaScript 语言设计的不严谨，有时候很容易把人给搞晕，比如说这个变量有效性判断。

先举几个例子：

![1.webp](http://www.npm8.com/wp-content/uploads/2016/04/1.webp_.jpg)

想要理解为什么得出上面的结果，首先得明白 undefined 和 null 在 JavaScript 中所表示的不同含义。

这里借用下阮一峰老师博客中的一个结论:

null和undefined基本是同义的，只有一些细微的差别。

**null表示"没有对象"，即该处不应该有值。**
典型用法是：

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

**undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。**典型用法是：

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

在 Java 中，if 条件中必须使用 boolean 表达式, 所以使用 JavaScript 时，也会习惯性的认为如此。实际上，JavaScript 中 null,undefined,0,"",false 作为 if 的条件的时候，都被认为是 false 。
所以，在判断变量时，可以用以下几种方式:

1、精确判断一个变量是否为 undefined

![2.webp](http://www.npm8.com/wp-content/uploads/2016/04/2.webp_.jpg)

2、精确判断一个变量是否为 null

![3.webp](http://www.npm8.com/wp-content/uploads/2016/04/3.webp_.jpg)

3、判断一个变量是否为 null 或 undefined

![4.webp](http://www.npm8.com/wp-content/uploads/2016/04/4.webp_.jpg)

4、判断值是否有效, 可以直接在if表达式中使用变量名称, 我常用来判断一个输入框值是否有效(注意: 如果变量值为0, 会被当作无效)

![5.webp](http://www.npm8.com/wp-content/uploads/2016/04/5.webp_.jpg)