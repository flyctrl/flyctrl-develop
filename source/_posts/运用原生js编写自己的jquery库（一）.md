---
title: 运用原生js编写自己的JQuery库（一）
tags:
  - JQuery库
  - 编写自己的JQuery库
id: 2623
categories:
  - JS/Jq
date: 2017-04-13 11:28:34
---

&emsp;&emsp;毫无疑问，JQuery是一款非常优秀的JavaScript库，它让我们开发项目变得更加便捷容易。不过，当你准备在一个项目（特别是移动项目）中使用JQuery时，你真的该好好思考一下，你会用到JQuery的哪些功能，是否真的需要jQuery。因为随着JavaScript的不断改善进化，现在它内置的功能已经非常强大，在很大程度上，已经可以实现以前需要在JQuery中才能实现的技术（如果你的项目需要在IE8之前的浏览器中使用，建议还是使用JQuery，这样可以省却很多兼容性问题）。

下面将列出一些可以使用JavaScript来实现JQuery功能的代码：

### **1、查找搜索选择器**

按ID查找：

```$('#test')  =>  document.getElementById('test');```

按class类名查找：

```$('.test')  =>  document.getElementsByClassName('test')```

按标签名查找：

```$('div')  =>  document.getElementsByTagName('div')```

当然，你也可以统一查找：
```javascript
$('#test')
document.querySelector('#test')

$('#test div')  =>  document.querySelectorAll('#test div')
$('#test').find('span')  => document.querySelectorAll('#test span');
```

获取单个元素：

```$('#test div').eq(0)[0]  =>  document.querySelectorAll('#test div')[0]```

获取HTML、head、body：
```javascript
$('html')  =>  document.documentElement

$('head')  =>  document.head

$('body')  =>  document.body
```

判断节点是否存在
```javascript
$('#test').length > 0  =>  document.getElementById('test') !== null

$('div').length > 0  => document.querySelectorAll('div').length > 0
```

遍历节点：

```javascript
$('div').each(function(i, elem) {})

function forEach(elems, callback) {
  if([].forEach) {
    [].forEach.call(elems, callback);
  } else {
    for(var i = 0; i < elems.length; i++) {
      callback(elems[i], i);
    }
  }
}

var div = document.querySelectorAll('div');
forEach(div, function(elem, i){
});
```

清空节点

```$('#test').empty()  =>  document.getElementById('test').innerHTML = '';```


节点比较
```javascript
$('div').is($('#test'))  =>  document.querySelector('div') === document.getElementById('test')
```

### **2、获取/设置内容（值）**


获取/设置元素内的内容
```javascript
$('div').html()  =>  document.querySelecotr('div').innerHTML

$('div').text()  =>  var t = document.querySelector('div');

t.textContent  || t.innerText;

$('div').html('<span>abc</span>');  =>  document.querySelecotr('div').innerHTML = '<span>abc</span>';

$('div;).text('abc')  =>  document.querySelecotr('div').textContent = 'abc'
```

获取包含元素本身的内容
```javascript
$('<div>').append($('#test').clone()).html() => document.getElementById('test').outerHTML $('<div>').append($('#test').clone()).html('<span>abc</span>') => document.getElementById('test').outerHTML = '<span>abc</span>'
```

获取表单值
```javascript
$('input').val()  => document.querySelector('input').value

$('input').val('abc') => document.querySelector('input').value = 'abc'
```

### **3、class类名操作**

类名新增
```javascript
$('#test').addClass('a')

function addClass(elem, className) {
  if(elem.classList) {
    elem.classList.add(className);
  } else {
    elem.className += ' ' + className;
  }

}

addClass(document.getElementById('test'), 'a');
```

类名删除

```javascript
$('#test').removeClass('a');

function removeClass(elem, className) {
  if(elem.classList) {
    elem.classList.remove(className);
  } else {
    elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

removeClass(document.getElementById('test'), 'a');
```

类名包含：
```javascript
$('#test').hasClass('a')

function hasClass(elem, className) {
  if(elem.classList) {
    return elem.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className);
  }
}

hasClass(document.getElementById('test'), 'a');
```

### **4、节点操作**

创建节点
```javascript
$('<div>')  =>  document.createElement('div')
```

复制节点：
```javascript
$('div').clone()  =>  document.querySelector('div').cloneNode(true)
```

插入节点:
```javascript
$('div').append('<span></span>')

var span = document.createElement('span');

document.querySelector('div').appendChild(span);
```

在指定节点之前插入新的子节点

```javascript
$('<span>').insertBefore('#test');
var t = document.getElementById('test');
var span = document.createElement('span');
t.parentNode.insertBefore(span, t);

/*更简单的*/

t.insertAdjacentHTML('beforeBegin', '<span></span>');
```

在指定节点后插入新的子节点：

```javascript
$('<span>').insertAfter('#test')

function insertAfter(elem, newNode){
  if(elem.nextElementSibling) {
    elem.parentNode.insertBefore(newNode, elem.nextElementSibling);
  } else {
    elem.parentNode.appendChild(newNode);
  }
}

var t = document.getElementById('test');   
var span = document.createElement('span');   
insertAfter(t, span);

/*更简单的*/

t.insertAdjacentHTML('afterEnd', '<span></span>');
```

获取父节点

```javascript
$('#test').parent()  =>  document.getElementById('test').parentNode
```

删除节点

```javascript
$('#test').remove()  

var t = document.getElementById('test');

t.parentNode.removeChild(t);
```

获取Element子节点
```javascript
    $('#test').children()
    function children(elem) {
      if(elem.children) {
        return elem.children;
      } else {
        var children = [];     
        for (var i = el.children.length; i--;) {       
            if (el.children[i].nodeType != 8)      
              children.unshift(el.children[i]);    
        }
        return children;
      }
    }

    children(document.getElementById('test'));
```

获取下一个兄弟节点：
```javascript
$('#test').next()
function nextElementSibling(elem) {
  if(elem.nextElementSibling) {
    return elem.nextElementSibling;
  } else {
    do { 
       elem = elem.nextSibling; 
    } while ( elem &amp;&amp; elem.nodeType !== 1 );   
    return elem;
  }
}

nextElementSibling(document.getElementById('test'));
```

获取上一个兄弟节点：
```javascript
$('#test').prev()     
function previousElementSibling(elem) {    
  if(elem.previousElementSibling) {    
    return elem.previousElementSibling;    
  } else {    
    do {     
      elem = elem.previousSibling;     
    } while ( elem &amp;&amp; elem.nodeType !== 1 );       
    return elem;    
  }   
}     

previousElementSibling(document.getElementById('test'));
```

### **5、属性操作**

获取属性
```javascript
$('#test').attr('class')  =>  document.getElementById('test').getAttribute('class')
```
删除属性
```javascript
$('#test').removeAttr('class')  => document.getElementById('test').removeAttribute('class')
```

设置属性
```javascript
$('#test').attr('class', 'abc')  =>  document.getElementById('test').setAttribute('class', 'abc');
```

### **6、CSS样式操作**

设置样式
```javascript
$('#test').css('height', '10px'); => document.getElementById('test').style.height = '10px';
```

获取样式
```$('#test').css('height')```

获取伪类的CSS样式
```window.getComputedStyle(el , ":after")[attrName];```
注：IE是不支持获取伪类的


### **7、字符串操作**

去除空格
```javascript
$.trim(' abc ')  

function trim(str){
  if(str.trim) {
    return str.trim();
  } else {
    return str.replace(/^\s+|\s+$/g, '');
  }
}

trim(' abc ');
```

### **8、JSON操作**

JSON序列化
```javascript
$.stringify({name: "TG"})  =>  JSON.stringify({name: "TG"})
```

JSON反序列化
```javascript
$.parseJSON('{ "name": "TG" }')  =>  JSON.parse('{ "name": "TG" }')
```