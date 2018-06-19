---
title: $.extend()和$.fn.extend()区别
tags:
  - $.extend()和$.fn.extend()区别
id: 874
categories:
  - JS/Jq
date: 2015-07-25 16:28:00
---

**$.extend()和$.fn.extend()用法和区别:**

在自己制作插件的时候会经常用到$.extend()和$.fn.extend()两个函数，无论从外观还是作用都非常的类似，但是实际上它们的区别是巨大的，下面就简单介绍一下它们的区别是什么。

在javascript中，没有尽管没有类这个概念，但是作为一门面向对象的语言，其实是有着类似于类的实际应用，那么从标准面向对象的概念来说，jQuery就是一个封装好了的jQuery类，那么通过选择器获得的就是jQuery对象实例。

### **一.$.extend():**

此方法是用来扩展jQuery类，此方法是全局性，直接用jQuery类即可引用，例如:
```javascript
$.extend({minValue:function(a,b){return a<b?a:b;}})
$.minValue(5.6);
```
也可以把这类函数称作为工具函数，不直接操作DOM元素，而是操作Javascript的非元素对象，或者执行其他非对象的特定操作。

### **二.$.fn.extend():**
此方法则是用来扩展jQuery的实例方法，也就是说jQuery类的实例对象可以调用此函数，代码如下:
```html
<script type="text/javascript">
$(document).ready(function(){
   $.fn.extend({
   theAlert:function(){
      alert("自定义的函数");
    }
  })
  $("thediv").theAlert()
})
</script>
</head>
<body>
  <div id="thediv">按钮</div>
</body>
</html>
```
以上代码通过$.fn.extend()方法为jQuery扩展一个实例方法，那么就必须要用对象实例来调用此方法，$("thediv")就是一个对象实例，这样它就可以调用添加的方法，当然在实际的开发中，几乎不可能有这么简单的例子，这里只是讲述一下原理。

&nbsp;

&nbsp;