---
title: 如何让你的ajax更加高效且完善
tags:
  - ajax高效
id: 616
categories:
  - JS/Jq
date: 2015-07-18 15:23:42
---

[![1401443515](http://www.npm8.com/wp-content/uploads/2015/07/1401443515.jpeg)](http://www.npm8.com/wp-content/uploads/2015/07/1401443515.jpeg)

&emsp;&emsp;随着web应用的高速发展，为了能让用户体验能更上一层楼，页面中的ajax的应用越来越多了，但是很多时候我们会遇到多个ajax同时发生请求，上一个ajax还没请求完成下一个就开始来了。还有一种情况是用户对一个ajax地址连续发出多次重复请求。但是这些情况大部分是我们无法控制的，因为我们无法控制用户的操作行为，但是可以控制他们发出的ajax请求，让ajax如何高效且稳定运行就是我们所需要做的了。

&emsp;&emsp;目前大部分网站都在使用jquery，今天我总结一下如何用jquery来执行高效的执行ajax请求，以下是我学习笔记：

### 一、更新你的ajax写法

我们来看下传统的的ajax写法：
```javascript
$.ajax({
    url: "/ajax",
    type:"get",
    dataType: "json"
　　success: function(){
　　    alert("哈哈，成功了！");
　　},
　　error:function(){
　　　　alert("出错啦！");
　　}
});
```
&emsp;&emsp;上面这个标准的ajax写法覆盖率非常高，在我工作中接触的所有ajax几乎都是上面这个写法，我相信大部分人都应该是这样写的。由于现在大部分前端开发人员一般是不涉及有关ajax操作和后台数据关联的工作，这部分工作大部分都是后台开发人员去执行的，所以这就是为什么现在我们依然经常看到**jquery1.4+**版本的jquery使用率依旧如此高的原因，因为许多开发人员都还停留在jquery1.4+版本甚至更低的版本的写法。jquery1.5+以后的版本的新功能大部分人都没用到，也没去更新自己的知识。

&emsp;&emsp;从jquery1.5+版本以后的，他们引入了一个新的功能**deferred**对象。jquery为此对ajax进行了重构。关于deferred大家可以看我转载的阮一峰老师的那篇文章，写的非常详细，我这里就不多做介绍了他的功能了。直接上jquery1.5+以后的ajax写法：
```javascript
jQuery.ajaxQueue({
    url: "/ajax",
    type:"get",
    dataType: "json"
}).done(function( data ) {
    console.log("成功回调");
}).fail(function(data){
    console.log("失败回调");
});
```
采用链式写法以后，代码的可读性大大提高。

上面的代码我们还可以通过**deferred**的then()函数来简化一下：
```javascript
jQuery.ajaxQueue({
    url: "/ajax",
    type: "get",
    dataType: "json"
}).then(doneFn, failFn);
```
then()有两个参数:

第一个参数是done()方法的回调函数，

第二个参数是fail()方法的回调方法。

如果then()只有一个参数，那么等同于done()。

### 二、ajax队列机制

&emsp;&emsp;jquery的queue()函数大家应该不陌生，我们ajax的队列机制就需要用到这个函数方法来实现。平时大家在工作的时候应该会遇到页面较多的ajax操作，很多时候用户在操作的时候，上一个操作还没请求完成就又开始操作下一个ajax请求。或者是重复请求同一个ajax，例如在一个注册页面中，需要ajax用户邮箱是否有重复，这个时候一般都是失去input焦点触发ajax请求，但是有些用户会重复操作，或者操作过快，导致ajax还没请求完就又马上开始请求。这个时候我们就需要用到queue()函数来将ajax队列化，让上一个请求完成后在进行下一个请求。

我们先来复习一下==queue()==的用法吧，来看一下jquery给的一个官网例子吧：
```javascript
$( "#show" ).click(function() {
  var n = jQuery.queue( $( "div" )[ 0 ], "fx" );
  $( "span" ).text( "Queue length is: " + n.length );
});
function runIt() {
  $( "div" )
    .show( "slow" )
    .animate({
      left: "+=200"
    }, 2000 )
    .slideToggle( 1000 )
    .slideToggle( "fast" )
    .animate({
      left: "-=200"
    }, 1500 )
    .hide( "slow" )
    .show( 1200 )
    .slideUp( "normal", runIt );
}
runIt();
```
queue(element,[queueName])接受两个参数，第一个是列队的DOM元素，第二个是队列的名称，默认是fx。

&emsp;&emsp;看到上面官网的例子大家应该对queue()的用法了有些了解了，但是我们今天的重点不是讲这个，我们要怎么用他来实现ajax队列化呢，我曾经在网上找了许多关于ajax队列的学习方法，但是最终都感觉不太理想，各种各样的写法都有，直到后面看到了Corey Frang写**ajaxQueue**真的非常给力，先来看下他写的这个插件和调用用法：
```javascript
/*
* jQuery.ajaxQueue - A queue for ajax requests
* 
* (c) 2011 Corey Frang
* Dual licensed under the MIT and GPL licenses.
*
* Requires jQuery 1.5+
*/ 
(function($) {

// jQuery on an empty object, we are going to use this as our Queue
var ajaxQueue = $({});

$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();
    // 将ajax加入运行队列
    ajaxQueue.queue( doRequest );
    // add the abort method
    promise.abort = function( statusText ) { 
        // proxy abort to the jqXHR if it is active
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        } 
        // if there wasn't already a jqXHR we need to remove from queue
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );

        if ( index > -1 ) {
            queue.splice( index, 1 );
        }

        // and then reject the deferred
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    }; 
    // run the actual query
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }

    return promise;
};
})(jQuery);
```
下面是调用方法：
```javascript
$.ajaxQueue({
    url: "/echo/html/",
    dataType: "json"
}).done(function( data ) {
    console.log("请求成功回调函数");  
}).fail(function(){
    alert("请求失败回调函数"); 
});
```
&emsp;&emsp;如果没有兴趣了解实现原理的同学直接把他的插件下载到自己工作包中直接调用就可以，调用方法也很简单。

&emsp;&emsp;下面我我贴上我根据自己的理解写了一些注释，希望能帮助大家理解：
```javascript
(function($) { 
// 声明一个jquery空对象，这个对象用来存放我们的队列
var ajaxQueue = $({});
$.ajaxQueue = function( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();
    // 执行我们的ajax查询操作
    ajaxQueue.queue( doRequest );
    // 添加中断ajax方法
    promise.abort = function( statusText ) { 
        // 判断ajax是否在运行,如果有正在运行ajax，就将其结束掉ajax
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        } 
        // 将执行完毕的ajax从队列中删除
        var queue = ajaxQueue.queue(),
            index = $.inArray( doRequest, queue );
        // 判断队列中是否存在执行完毕ajax，如有就将其从队列中剔除 
        if ( index > -1 ) {
            queue.splice( index, 1 );
        }

        // 最后将ajax状态改为失败，rejectWith()作用相当于reject()
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    }; 
    // 执行我们的ajax查询操作方法
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    } 
    return promise;
};
})(jQuery);
```
&emsp;&emsp;上面代码的注释是我自己根据对代码的理解写的，并不是根据他的注释翻译过来的，或许也有不准确的地方，如有问题希望能帮指出。

上面有几个要点需要再解释一下：

*   abort()：用来终止之前所有的未结束的ajax请求，然后重新开始新的请求，但是这个方法在终止请求的时候，实际上会触发ajax的success回调函数方法，所以需要在success方法中添加判断response对象是否存在，上面代码中作者就进行了判断。(if(index>-1))；

*  rejectWith():这个方法和reject()作用一样，将Deferred对象的状态由“未完成”改为“已失败”状态，并触发deferred的fail回调函数。如果deferred的状态已经是“已完成”，那么该函数将失效。但是reject函数可以接收一个参数，用于传给deferred的failCallback。而deferred.rejectWith()额外接受一个参数context，作为在fail回调函数中this的值。

我们来做一个简单的例子测试一下：
```javascript
(function(){
    var dfd = $.Deferred();
    dfd.fail(function(context){          
        alert(this.name);
        alert(context);
    });       
    dfd.rejectWith({name:'520UED'}, ["小欧又在做测试"]);
})
```