---
title: 运用原生js编写自己的JQuery库（二）
tags:
  - JQuery库
  - 编写自己的JQuery库
id: 2631
categories:
  - JS/Jq
date: 2017-04-13 11:42:57
---

&emsp;&emsp;为什么说不要过度依赖JQuery呢？从项目方面来讲，一些项目在开发中实际用到JQuery内置功能不多，这样会造成项目臃肿；另一方面，目前的主流已经倾向于原生开发。而在上一篇《[运用原生js编写自己的JQuery库（一）]》一文中已经介绍了部分使用原生JavaScript实现JQuery功能的代码，这一章将继续列举。

### **1、位置**

获取相对于文档的位置
```javascript
$('#test').offset() 

function offset(elem) {
  var rect = elem.getBoundingClientRect()    
  return {      
    top: rect.top + document.body.scrollTop,      
    left: rect.left + document.body.scrollLeft    
  }
}

offset(document.getElementById('test'));
```

获取相对于具有定位（非static）的父元素（祖先元素）的位置：
```javascript
    $('#test').position()

    var t = document.getElementById('test');

    var position = {top: t.offsetTop, left: t.offsetLeft};
```

获取相对于可视区左上角的位置
```javascript
var offset = $('#test').offset();
var position = { top: offset.top - document.body.scrollTop,
          left: offset.left - document.body.scrollLeft
}

var position = document.getElementById('test').getBoundingClientRect();
```

### **2、尺寸**


获取包含内边距（padding）和边框（border）的元素高宽

```javascript
var width = $('#test').outerWidth();

var height = $('#test').outerHeight();

var t = document.getElementById('test');

var width = t.offsetWidth;

var height = t.offsetHeight;
```
获取元素内容的总高度
```var t = document.getElementById('test');```

视口大小
```javascript
var pageWidth = window.innerWidth || document.documentElement.clientWidth;

var pageHeight = window.innerHeight || document.documentElement.clientHeight;
```

### **3、绑定自定义数据**

```javascript
/*绑定*/

$('#test').data('name', 'TG');

/*读取*/

$('#test').data('name');

/*移除*/

$('#test').removeDate('name');

var t = document.getElementById('test');

/*绑定*/

t.dataset.name = 'TG';

/*读取*/

t.dataset.name

/*移除*/

delete t.dataset.name
```

### **4、事件**

绑定事件
```javascript
$('#test').on('click', function(){})

var addEvent = function(dom, type, handle, capture) {   
  if(dom.addEventListener) {   
    dom.addEventListener(type, handle, capture);   
  } else if(dom.attachEvent) {   
    dom.attachEvent("on" + type, handle);   
  }
};

var t = document.getElementById('test');

addEvent(t, 'click', function(){});
```

移除事件
```javascript
$('#test').off('click', fn);

var deleteEvent = function(dom, type, handle) {   
  if(dom.removeEventListener) {    
    dom.removeEventListener(type, handle);   
  } else if(dom.detachEvent) {   
    dom.detachEvent('on' + type, handle);   
  }
};

var t = document.getElementById('test');

deleteEvent(t, 'click', fn);
```

事件代理
```javascript
$(document).on('click', '.test', fn);

function eventBroker(e, className, fn) {    
  var target = e.target;  
  while(target) {   
    if(target &amp;&amp; target.nodeName == '#document') {   
      break;    
    } else if(target.classList.contains(className)) {  
      fn();   
      break;   
    };   
    target = target.parentNode;   
  };   
}

addEvent(document, 'click', function(e){
  eventBroker(e, 'test', function(){});
});
```

获取Event对象
```javascript
$('#test', 'click', function(event){
  event = event.originalEvent;
});
var t = document.getElementById('test');

addEvent(t, 'click', function(event){
  event = event || window.event;
});
```

DOM加载完毕
```javascript
$(document).ready(function(){});

function ready(fn) {   
  if (document.readyState != 'loading'){   
    // ie9+   
    document.addEventListener('DOMContentLoaded', fn);   
  } else {   
    // ie8   
    document.attachEvent('onreadystatechange', function() {   
      if (document.readyState != 'loading'){   
        fn();   
      }   
    });   
  }  
}
```

指定事件触发
```javascript
$('#test').trigger('click');

function trigger(elem, type) {
  if (document.createEvent) {   
    var event = document.createEvent('HTMLEvents');   
    event.initEvent(type, true, false);   
    elem.dispatchEvent(event);  
  } else {   
    elem.fireEvent('on' + type);  
  }
}

var t = document.getElementById('test');

trigger(t, 'click');
```

### **5、AJAX**

GET
```javascript
$.get("test.php", { name: "TG"},   
  function(data){   
    console.log(data);   
});

var xhr= new XMLHttpRequest();  
xhr.open('GET', 'test.php?name=TG', true); // false（同步）  
xhr.onreadystatechange = function() {   
  if (xhr.readyState === 4) {   
    if (xhr.status >= 200 &amp;&amp; xhr.status < 400) {   
      // 成功   
      var data = JSON.parse(xhr.responseText);   
    } else {   
     // 错误   
    }   
  }  
};

xhr.send(null);
```

POST
```javascript
$.post("test.php", { name: "TG"},   
  function(data){   
    console.log(data);   
});

var xhr= new XMLHttpRequest();   
xhr.open('POST', 'test.php', true); // false（同步）  
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  // 必需
xhr.onreadystatechange = function() {       
  if (xhr.readyState === 4) {       
    if (xhr.status >= 200 &amp;&amp; xhr.status < 400) {       
      // 成功       
      var data = JSON.parse(xhr.responseText);       
    } else {       
      // 错误       
    }       
  }     
};
var data = {name: "t"};  

xhr.send(data);
```

**Fetch 请求**

GET
```javascript
fetch(url).then(function (response) {      
  return response.json();    
}).then(function (jsonData) {      
  console.log(jsonData);    
}).catch(function () {      
  console.log('出错了');    
});
```

POST
```javascript
fetch(url,{   
  method: 'POST',   
  headers: {   
    'Content-Type': 'application/x-www-form-urlencoded'   
  },   
  body: 'name=TG&amp;love=1'
}).then(function(response){})
```

### **6、数组**

判断元素是否在数组内
```$.inArray(item, array)```

判断是否是数组
```Array.isArray(arr)```

数组迭代
```javascript
$.map(arr, function(value, index) {})
arr.map(function(value, index) {})
```
### **7、特效**

隐藏显示
```javascript
$('#test').hide();

var t = document.getElementById('test');

t.style.display = 'none';

$('#test').show();

t.style.display = 'block';
```