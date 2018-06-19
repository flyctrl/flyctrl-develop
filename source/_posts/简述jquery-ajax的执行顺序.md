---
title: 简述jQuery ajax的执行顺序
tags:
  - jQ ajax的执行顺序
id: 2046
categories:
  - JS/Jq
date: 2016-01-07 22:42:25
---

&emsp;&emsp;jquery ajax的执行顺序大家在项目经常会颠倒，下面通过本文给大家介绍jquery ajax的执行顺序，涉及到jquery ajax执行顺序相关知识，对jquery ajax执行顺序相关知识感兴趣的朋友一起学习吧！
jQuery中的Ajax的async默认是true(异步请求),如果想一个Ajax执行完后再执行另一个Ajax, 需要把async=false即可。

**代码如下:**
```javascript
function TestAjax()
{
 var UserName = $("#txtUserName").val();
 $.ajax({
  url:"AjaxCheckUserName.htm",
  async:false,
  success:function(data){
   alert(data);
  }
 });
 alert('Test');
 $.ajax({
  url:"AjaxHandler.ashx",
  async:false,
  data:"UserName=" + UserName,
  success:function(data){
   $("#divAjax").html(data);
  },
  error:function(msg){
   alert(msg.responseText);
  }
 });
}
```
接着看下jquery $.ajax各个事件执行顺序

执行顺序如下：
* 1.ajaxStart(全局事件)
* 2.beforeSend
* 3.ajaxSend(全局事件)
* 4.success
* 5.ajaxSuccess(全局事件)
* 6.error
* 7.ajaxError (全局事件)
* 8.complete
* 9.ajaxComplete(全局事件)
* 10.ajaxStop(全局事件)