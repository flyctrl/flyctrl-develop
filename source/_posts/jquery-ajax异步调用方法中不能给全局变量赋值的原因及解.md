---
title: jquery ajax异步调用方法中不能给全局变量赋值的原因及解决方法
tags:
  - ajax 全局变量赋值
id: 1024
categories:
  - JS/Jq
date: 2015-07-27 12:02:32
---

在调用一个jquery的ajax方法时我们有时会需要该方法返回一个值或者给某个全局变量赋值，可是我们发现程序执行完后并没有获取到我们想要的值，这时很有可能是因为你用的是ajax的异步调用async:true(默认情况),如：
```javascript
function ManageCommentText(text) {
var result = text;
$.ajax({
data: "get",
url: "GetComments.aspx",
data: "type=getText&amp;commentText=" + text,
cache: false,
async: false,
success: function (data) {
result = data;
}
})
return result;
```
以上方法是ajax的同步调用，只有在获取到了data值并赋值给result以后才会返回result完成该方法的调用。若设为async:true,
则会未等到获取data值就已经返回了result。另一个解决办法就是将你的代码直接写到success方法里。（根据你的业务并不是所有的都可以直接写到success里的）。

注意：如果设定为 async: false,就失去 ajax异步的优点了哦。
&nbsp;
&nbsp;