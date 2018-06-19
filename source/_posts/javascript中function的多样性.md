---
title: JavaScript中function的多样性
tags:
  - function的多样性
id: 1392
categories:
  - JS/Jq
date: 2015-08-28 10:24:47
---

JavaScript 中的 function 有多重意义。它可能是一个构造器（constructor），承担起对象模板的作用； 可能是对象的方法（method），负责向对象发送消息。还可能是函数，没错是函数，和对象没有任何关系独立存在的可以被调用的函数。

由于语言设计者的妥协，在 JavaScript 加入了一些 class 相关的特性，以使 JavaScript 看起来确实象 Java，可以 “面向对象”。虽然 JavaScript 添加了 new 和 this， 但却没有 class （ES6已加）。最后 function 临时担负起 class 的任务。

**语义1：作为构造器的 function**
```javascript
/**
 * 页签
 *
 * @class Tab
 * @param nav {string} 页签标题的class
 * @param content {string} 页面内容的class
 *
 */
function Tab(nav, content) {
    this.nav = nav;
    this.content = content;
}
Tab.prototype.getNav = function() {
    return this.nav;
};
Tab.prototype.setNav = function(nav) {
    this.nav = nav;
};
Tab.prototype.add = function() {

};
```
// 创建对象

var tab = new Tab('tab-nav', 'tab-content');

这里定义了一个类 Tab，创建了一个对象 tab。以上使用了 function ，this, new。this, new 是常见的面向对象语言中的关键字， 这里的 function 则担负传统面向对象语言中的 class 作用。当然这时候标识符的命名一般遵循 “首字母大写” 规则。

&nbsp;

**语义2：作为对象方法的 function**

由于 JavaScript 中无需类也可以直接创建对象，因此有两种方式给对象添加方法。第一种先定义类，方法挂在原型上，如上例的 Tab，原型上有 getNav、setNav 和 add 方法。以下还有一种，直接在 function 内的 this 上添加方法。
```javascript
function Tab(nav, content) {
    this.nav = nav
    this.content = content

    this.getNav = function() {
        // ...
    }
    this.setNav = function() {
        // ...
    }
    this.add = function() {
        // ...
    }
}
```
这里 Tab 是语义1， this.getNav/this.setNav/this.add 是语义2，作为对象的方法。 另外，可以直接定义对象及其方法
```javascript
var tab = {
    nav: '',
    content: '',
    getNav: function() {
        // ...
    },
    setNav: function() {
        // ...
    },
    add: function() {
        // ...
    }
}
```
tab.getNav/tab.setNav/tab.add 是语义2，作为对象 tab 的方法。

&nbsp;

**语义3：作为独立的函数**
```javascript
/*
 * 判断对象是否是一个空对象
 * @param obj {Object}
 * @return {boolean}
 */
function isEmpty(obj) {
    for (var a in obj) {
        return false
    }
    return true
}

// 定义一个模块
~function() {
    // 辅助函数
    function now() {
        return (new Date).getTime()
    }

    // 模块逻辑...
}();

// 采用CommonJS规范的方式定义一个模块
define(require, exports, moduel) {
    // 辅助函数
    function now() {
        return (new Date).getTime()
    }

    // 模块逻辑...
})
```
isEmpty 作为一个全局函数存在，模块定义里面的 now 则作为局部函数存在，无论 isEmpty 还是 now 这里的 function 都指函数，它不依赖与对象和类，可以独立被调用。

&nbsp;

**语义4：匿名函数定义模块**
```javascript
// 全局命名空间
var RUI = {}

// ajax.js
~function(R) {
    // 辅助函数...

    ajax = {
        request: function() {
            // ...
        }
        getJSON: function() {
            // ...
        }
        ...
    }

    // 暴露出模块给 R
    R.ajax = ajax
}(RUI);

// event.js
~function(R) {
    // 辅助函数...

    // 事件模块定义...

    // 暴露出模块给 R
    R.event = event
}(RUI);

// dom.js
~function(R) {
    // 辅助函数...

    // DON模块定义...

    // 暴露出模块给 R
    R.dom = dom
}(RUI);
```
这里的匿名函数执行后把API对象暴露给了RUI，无论匿名函数内干了多少活，对应匿名函数外是看不到的，也是没有必要去理会的。最终关心的是公开的 API 方法，只要了解这些方法的参数及意义就可以马上使用它了。

&nbsp;

**语义5：匿名函数处理某些特殊效果如处理一些数据又不想暴露过多的变量**
```javascript
// 判断IE版本的hack方式
var IEVersion = function() {
    var undef, v = 3
    var div = document.createElement('div')
    var all = div.getElementsByTagName('i')

    while (
        div.innerHTML = '<!-- [if gt IE ' + (++v) + ']><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef
}();
```
最终只要一个结果 IEVersion，匿名函数内部用到了一些局部变量全部可以隔离开。这种方式对于一些临时性的数据加工非常有效，紧凑。

**总结：**

JavaScript 是 Eich 花 10 天的时间设计出来的，本是一个短小紧凑的脚本/函数式语言，因为市场营销的原因，为了迎合 Java，加入了一些类 Java 的面向对象特性（constructor, this, new）。 this，new 照搬过来， class 的功能却交给了 function 来承担。导致 JavaScript function 让人迷惑，一会用来定义类，一会又作为方法或函数。另外一部分人还挖掘出它可以用来定义模块等等。

这一切随着 ES6 的到来结束了，ES 中的保留字 “class” 终于被实现了，定义类一律推荐使用 class。另外还有 extend 关键字，基本把 “类式继承” 都搞过来了。 Douglas 在 Nordic.js 2014 大会上点评到 ES6 最糟糕的设计之一就是 class，另外也不建议使用 this 和 new，这表明他依然赞成使用函数式语言方式去写 JavaScript，而不是基于类的面向对象式。