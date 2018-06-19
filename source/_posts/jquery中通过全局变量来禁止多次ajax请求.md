---
title: jquery中通过全局变量来禁止多次ajax请求
tags:
  - ajax禁止多次请求
  - jquery中禁止多次ajax请求
id: 2009
categories:
  - JS/Jq
date: 2015-12-28 15:59:54
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在前端开发中，很多都需要考虑用户体验，就在本文即将介绍的ajax就需要值得考虑：用户不太懂网站，点了按钮后，如果网速慢了会反应特别慢，就怕用户连续点击按钮造成客户端向服务器发送了一次又一次的ajax请求，浪费了服务器的资源。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在百度上搜索了半天，开始的时候是搜索jquery中ajax的当前状态如何获取，想通过每次ajax请求之前来判断当前ajax的状态来控制再次的ajax请求，在网上看了好多的教程，自己也测试了好多，都没啥用！这里不得不再报怨一句，搜索引擎里搜索出来的文章可真是天下一大抄啊！
不说废话了，来看测试后总结出来的代码：
```javascript
<script language="javascript">
var ajaxstate=false;//定义全局变量，通过这个变量来获得当前的ajax状态
$(function(){	
	$(document).ajaxStart(function(){
		$("#Con").html("数据加载中");
	}).ajaxStop(function(evt,request,settings){//jquery里的全局事件，当ajax请求结束后，改变全局变量的值
		ajaxstate=false;
	});		   
});
$.ajaxSetup({
  global:true,
  type: "POST",
  cache:false,
  async:true,
  beforeSend:function(e,xhr){
    if(ajaxstate){
      alert("上次请求尚未完成,不能请求"+xhr.url);
      return false;
    }
    ajaxstate=true;
  },
  error:function(a,b,c){
    alert(b+":"+c+"\n\n"+"请重新登录：www.npm8.com");
    $("#R").html(b+":"+c+a+" "+"请重新登录：www.npm8.com");
  }
});
</script>
```
大家可以根据上面提供的代码，自己改编一下在本地进行测试，当连续俩次ajax请求时，第二次请求就会弹出提示框的！