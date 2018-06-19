---
title: jQuery中关于on的使用
tags:
  - on的使用
id: 490
categories:
  - JS/Jq
date: 2015-07-16 10:50:49
---

**移除on()所绑定的方法，可以使用off()方法处理**
```javascript
$(document).ready(function(){
$("p").on("click",function(){
$(this).css("background-color","pink");
});
$("button").click(function(){
$("p").off("click");
});
});
```

**事件只需要一次的操作，可以使用one()这个方法**
```javascript
$(document).ready(function(){
$("p").one("click",function(){
$(this).animate({fontSize:"+=6px"});
});
});
```

**trigger()绑定**
```javascript
$(selector).trigger(event,eventObj,param1,param2,...)
$(document).ready(function(){
$("input").select(function(){
$("input").after(" Text marked!");
});
$("button").click(function(){
$("input").trigger("select");
});
});
```

**多个事件绑定同一个函数**
```javascript
$(document).ready(function(){
$("p").on("mouseover mouseout",function(){
$("p").toggleClass("intro");
});
});
```

**多个事件绑定不同函数**
```javascript
$(document).ready(function(){
$("p").on({
mouseover:function(){$("body").css("background-color","lightgray");},
mouseout:function(){$("body").css("background-color","lightblue");},
click:function(){$("body").css("background-color","yellow");}
});
});
```

**绑定自定义事件**
```javascript
$(document).ready(function(){
$("p").on("myOwnEvent", function(event, showName){
$(this).text(showName + "! What a beautiful name!").show();
});
$("button").click(function(){
$("p").trigger("myOwnEvent",["Anja"]);
});
});
```

**传递数据到函数**
```javascript
function handlerName(event)
{
alert(event.data.msg);
}
$(document).ready(function(){
$("p").on("click", {msg: "You just clicked me!"}, handlerName)
});
```

适用于未创建的元素
```javascript
$(document).ready(function(){
$("div").on("click","p",function(){
$(this).slideToggle();
});
$("button").click(function(){
$("&amp;lt;p&amp;gt;This is a new paragraph.&amp;lt;/p&amp;gt;").insertAfter("button");
});
});
```