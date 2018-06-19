---
title: Jquery插件开发基础代码讲解
tags:
  - jq插件开发
id: 866
categories:
  - 前端杂货
date: 2015-07-25 16:14:38
---

```javascript
//这里可以以注释的形式写上版本号，插件用途，版权，插件使用格式等等等等
//加上 ; 能防止前面代码没有 ； 结尾的后果，无惧压缩
;(function($,window,document,undefined){ //undefinde是真实的undefined，并非参数
//将可选择的变量传递给方法

//定义构造函数(对象)
var Datalist=function(ele,opt){
this.$element=ele;
this.defaults={ //定义默认属性
'默认属性名':'对应属性值'
},
this.options=$.extend({}, this.defaults, opt); //在使用的时候会自动执行$.extend()函数，让用户自定的属性值覆盖default里面默认的属性值。前面加上{}空对象是为了防止多次调用时前面的属性值修改了默认属性值

//这里可以添加一些通用的属性方法，供下面多个方法使用

}

//在对象原型上定义方法,数目不限
Datalist.prototype={
showList:function(){
var color=this.options.bgcolor; //值的传递形式(最好这里把需要的全部取出来，毕竟在不同环境下this的指代不一样)

//这里是具体的实现过程书写区域

return this; //return是为了不破坏jquery链式调用的特点（注意return的对象是原对象），也可以以返回值的形式回调一个函数
}
}

//在插件中使用Datalist对象
$.fn.myDatalist=function(options){
//创建实体
var datalist=new Datalist(this,options);
//以返回值调用的形式调用其方法
return datalist.showList();
}

})(jQuery,window,document); //其实就是 (function(){}());的闭包形式，定义匿名函数并立即调用，里面的事件绑定什么的就像在全局定义一样的可以用(页面关闭的时候才销毁)，但是全局空间里面是不可见不可取得的

//在需要的地方调用插件

$(document).ready(function(){
$(object).myDatalist({"属性名":"属性值"}); //没有设置的属性会用默认值
});

```