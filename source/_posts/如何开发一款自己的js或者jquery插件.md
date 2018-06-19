---
title: 如何开发一款自己的js或者jquery插件
tags:
  - 开发 js或者jquery插件
id: 1822
categories:
  - JS/Jq
date: 2015-10-08 11:00:49
---

## 引子

&emsp;&emsp;现在网上关于js和jquery封装的插件很多，我刚刚接触前端的时候，就很敬佩那些自己写插件的大牛们！因为是他们给网站开发更多的便利，很多网页效果，网上很多现成的插件！那么这些插件是如何写的呢？首先是有扎实的js和jquery技术基础，其次还有一些写插件的方法和技巧。关于js和jquery的技术基础，那是一个慢慢积累的过程。但是关于写插件的一些注意和技巧，本文可以略微介绍一下，方便以后写插件的时候用得到。

## jquery插件开发模式

jquery插件一般有三种开发方式：

* 通过$.extend()来扩展jQuery
* 通过$.fn 向jQuery添加新的方法
* 通过$.widget()应用jQuery UI的部件工厂方式创建

&emsp;&emsp;第一种$.extend()相对简单，一般很少能够独立开发复杂插件，第三种是一种高级的开发模式，本文也不做介绍。第二种则是一般插件开发用到的方式，本文着重讲讲第二种。

## 插件开发

第二种插件开发方式一般是如下定义
```javascript
$.fn.pluginName = function() {
//your code here
}
```

插件开发，我们一般运用面向对象的思维方式

例如定义一个对象
```javascript
var Haorooms= function(el, opt) {
this.$element = el,
this.defaults = {
'color': 'red',
'fontSize': '12px',
'textDecoration':'none'
},
this.options = $.extend({}, this.defaults, opt)
}
//定义haorooms的方法
haorooms.prototype = {
changecss: function() {
return this.$element.css({
'color': this.options.color,
'fontSize': this.options.fontSize,
'textDecoration': this.options.textDecoration
});
}
}
```

&emsp;&emsp;$.extend({}, this.defaults, opt)有{}主要是为了创建一个新对象，保留对象的默认值。
```javascript
$.fn.myPlugin = function(options) {
    //创建haorooms的实体
    var haorooms= new Haorooms(this, options);
    //调用其方法
    return Haorooms.changecss();
}
```

调用这个插件直接如下就可以
```javascript
$(function() {
 $('a').myPlugin({
 'color': '#2C9929',
 'fontSize': '20px'
 });
})
```

## 上述开发方法的问题

&emsp;&emsp;上面的开发方法存在一个严重的问题，就是定义了一个全局的Haorooms，这样对于插件的兼容等等各个方面都不好。万一别的地方用到了Haorooms，那么你的代码就悲催了！现在我们把上面的代码包装起来，用一个**自调用匿名函数**(有时又叫块级作用域或者私有作用域)包裹，就不会出现这个问题了！包括js插件的开发，也是一样的，我们用一个自调用匿名函数把自己写的代码包裹起来，就可以了！包裹方法如下：
```javascript
(function(){

})()
```

用上面的这个包裹起来，就可以了。

&emsp;&emsp;但是还有一个问题，当我们研究大牛的代码的时候，前面经常看到有“；”，那是为了避免代码合并等不必要的错误。

例如，我们随便定义一个函数：
```javascript
var haoroomsblog=function(){

}
(function(){

})()
```

&emsp;&emsp;由于haoroomsblog这个函数后面没有加分号，导致代码出错，为了避免这类情况的发生，通常这么写！
```javascript
；(function(){

})()
```

&emsp;&emsp;把你的插件代码包裹在上面里面，就是一个简单的插件了。（注js插件和jquery插件都是如此）

## 还有一个问题

把你的插件包裹在
```javascript
；(function(){

})()
```

&emsp;&emsp;基本上可以说是完美了。但是为了让你开发的插件应用更加广泛，兼容性更加好，还要考虑到用插件的人的一些特殊的做法，例如，有些朋友为了避免jquery和zeptojs冲突，将jquery的前缀“$”,修改为“jQuery”，还有些朋友将默认的document等方法修改。为了让你的插件在这些东西修了了的情况下照常运行，那么我们的做法是，把代码包裹在如下里面：
```javascript
;(function($,window,document,undefined){
//我们的代码。。
})(jQuery,window,document);
```

就可以避免上面的一些情况了！

至此，你开发的插件就算完美了！
&nbsp;