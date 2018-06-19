---
title: jQuery中的ajax async同步和异步详解
tags:
  - ajax async同步和异步
id: 1805
categories:
  - JS/Jq
date: 2015-10-07 16:48:19
---

async在jquery ajax中是一个同步参数。本篇文章给大家介绍jq中的ajax async同步和异步。

项目中有这样一个需求，使用ajax加载数据返回页面并赋值，然后前端取出该值，这其中涉及到代码的顺序问题，有时后台还未返回数据，但已执行后面代码，所以就会造成取不到值。
```javascript
$.ajax({
	type: "post",
	url: "admin/PfmOptionRuleItem.do",
	success: function(data) {
		$("#ruleItem").val(data.ruleItem); //① 
	} 
}); 
return $("#ruleItem").val(); //②
```

如果①还未从后台返回数据 此时执行②就获取不到值
Ajax的第一个字母是asynchronous的开头字母，这意味着所有的操作都是并行的，完成的顺序没有前后关系。

$.ajax()的async参数总是设置成true，这标志着在请求开始后，其他代码依然能够执行。

如果把这个选项设置成false，这意味着所有的请求都不再是异步的了，这也会导致浏览器被锁死。

虽然官方不建议这么干，只是不能用太多，否则会造成用户体验不佳

举个栗子
```javascript
alert("setp 1");
$.ajax({
	url: "admin/PfmOptionRuleItem.do",
	async: false,
	success: function(data) {
		alert("hello ajax"); //①  
	} 
}); 
alert("setp 2"); //②
```

当把asyn设为false时，这时ajax的请求时同步的，也就是说，这个时候ajax块发出请求后，
他会等待在①这个地方，不会去向下执行②，直到①执行完毕
此时依次执行顺序为

setp 1

hello ajax

setp 2

如果async为true 则执行顺序为

setp 1

setp 2

hello ajax

关于本文给大家叙述的jQuery中的ajax async同步和异步，全部介绍完了，希望对大家有所帮助。