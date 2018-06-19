---
title: js简单实现input文本框实现宽度自适应
tags:
  - input文本框宽度自适应
  - input文本框自适应
id: 1651
categories:
  - JS/Jq
date: 2015-09-15 16:56:10
---

本章节介绍一下如何让一个文本框的宽度能够随着文本框中的内容的宽度增长而增长，也就是能够实现宽度自适应效果。

代码实例如下:
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>www.npm8.com</title>
<script type="text/javascript">
window.onload=function(){
var otxt=document.getElementById("txt");
otxt.onkeyup=function(){
this.size=(this.value.length>4?this.value.length:4);
}
}
</script>
</head>
<body>
<input type="text" id="txt" size="4"/>
</body>
</html>
```
&nbsp;

以上代码实现了我们的要求，代码非常的简单，注册onkeyup事件处理函数，此函数可以判断当前输入内容的长度是否大于默认长度，如果不大于，则文本框的长度就是4，否则就是输入内容的长度。