---
title: 运用原生js编写自己的JQuery库（三）
tags:
  - JQuery库
  - 编写自己的JQuery库
id: 2640
categories:
  - JS/Jq
date: 2017-04-14 16:34:01
---
&emsp;&emsp;在[运用原生js编写自己的JQuery库（一）]和[运用原生js编写自己的JQuery库（二）]两篇文章中已经列举了大量的使用原生JavaScript替代JQuery的例子，在本文中将继续列举！

### **1、表单**

获取焦点
```javascript
$('#test').focus();  
$('#test').focus(function(){});

var t = document.getElementById('test');
function addEvent(dom, type, handle, capture) {       
  if(dom.addEventListener) {       
    dom.addEventListener(type, handle, capture);        
  } else if(dom.attachEvent) {       
    dom.attachEvent("on" + type, handle);       
  } 
}; 

function focus(elem, fn) {
  if(fn &amp;&amp; typeof fn === 'function') {
    addEvent(elem, 'focus', fn);
  } else {
    elem.focus();
  }
}

focus(t, function(){});
```

失去焦点
```javascript
$('#test').blur();

$('#test').blur(function(){});

function blur(elem, fn) {    
  if(fn &amp;&amp; typeof fn === 'function') {    
    addEvent(elem, 'blur', fn);    
  } else {    
    elem.blur();    
  }   
}    

blur(t, function(){});
```

实时监控
```javascript
$('#test').on('input propertychange', fn);

function inputChange(dom, fn, capture) {   
  capture = capture || false;   
  addEvent(dom, 'input', fn, capture);
  addEvent(dom, 'propertychange', fn, capture);   
}

inputChange(t, function(){});
```

### **2、判断类型**

判断类型
```javascript
$.type(obj);

Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();```

判断是否为一个函数
```javascript
$.isFunction(fn)

function isFunction(fn){
  return typeof fn === 'function';
}
```

判断是否为数字
```javascript
$.isNumeric(num);

function isNumber(num) {
  var type = typeof num;
  return ( type === 'number' || type === 'string') &amp;&amp; 
      !isNaN( num - parseFloat( num ) );
};
```

判断是否为数组
```javascript
$.isArray(obj);

function isArray(obj) {
  if( Array.isArray ) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}
```

### **3、时间**


获取当前时间
```javascript
$.now()

new Date().getTime();

/* 更简单 */
+new Date();
```

### **4、改变上下文（this）**

```javascript
$.proxy(fn, context);

fn.bind(context);

```

### **5、空函数**


创建一个空函数
```javascript
var fn = $.noop();

var fn = function() {}
```

### **6、数组**

合并数组
```javascript
$.merge(arr1, arr2)

function (arr1, arr2) {
  return arr1.concat(arr2);
}
```

类数组对象转换成数组
```javascript
var divs = document.querySelectorAll('div');

var arr = $.makeArray(divs);

var arr = Array.prototype.slice.call(divs);

// ES6 
var arr = Array.from(divs)
```

### **7、Iframe**


获取iframe的document
```javascript
$('#iframe').contents();

var iframe = document.getElementById('iframe');

iframe.contentDocument;
```

### **8、元素包含关系**

```javascript
$.contains(parent, child);

function contains(root, el) { 
  /* Chrome / Firefox */  
  if (root.compareDocumentPosition) {  
    return root === el || !!(root.compareDocumentPosition(el) &amp; 16);  
  } 

  /* IE */
  if (root.contains &amp;&amp; el.nodeType === 1){   
    return root.contains(el) &amp;&amp; root !== el;   
  }   

  while ((el = el.parentNode)) {  
    if (el === root) { return true; }  
    return false;   
  }
}
```

### **9、scroll**

设置/获取window滚动位置
```javascript
/*获取*/
$(window).scrollTop();

(document.documentElement &amp;&amp; document.documentElement.scrollTop) || document.body.scrollTop

/*设置*/
$(window).scrollTop(10);

(document.documentElement &amp;&amp; document.documentElement.scrollTop = 10) || document.body.scrollTop = 10;
```

设置某个元素滚动位置
```javascript
$('#test').scrollTop(10);

var t = document.getElementById('test');

t.scrollTop = 10;
```

注意：别加单位！

### **10、节点**

获取元素的最近的祖先定位（position非static）元素
```javascript
$('#test').offsetParent();

var t = document.getElementById('test');

t.offsetParent;
```

到这里，《运用原生js编写自己的JQuery库》系列就告一段落了！