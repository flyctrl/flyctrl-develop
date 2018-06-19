---
title: jQuery记住密码 插件的使用
tags:
  - jq记住密码
id: 306
categories:
  - 插件库
date: 2015-07-13 15:16:48
---

[http://pan.baidu.com/s/1gdf1kDd](http://pan.baidu.com/s/1gdf1kDd)最新可到jquery插件官网下载

我实现时找的所有资料[http://pan.baidu.com/s/1mg0pKaG](http://pan.baidu.com/s/1mg0pKaG)【多了点jquery.cookie的API】
```HTML
<script type="text/javascript" src="jquery.cookie.js"></script>
<script type="text/javascript">
$(function () {
$("#username").add("#password").val("");
//初始化验证是否记住密码
if ($.cookie("rmbUser") == "true") {
$("#keepPwd").prop("checked", true);//其中网上$().attr('checked')不可用 花我最多时间的就是这个
$("#username").val($.cookie("userName"));
$("#password").val($.cookie("passWord"));
}
//设置cookie
function rmbPwd(){
if ($("#keepPwd").prop("checked") == true) {//其中网上$().attr('checked')不可用
var userName = $("#username").val();
var passWord = $("#password").val();
$.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
$.cookie("userName", userName, { expires: 7 }); // 存储一个带7天期限的 cookie
$.cookie("passWord", passWord, { expires: 7 }); // 存储一个带7天期限的 cookie
}
else {
$.cookie("rmbUser", "false", { expires: -1 });
$.cookie("userName", '', { expires: -1 });
$.cookie("passWord", '', { expires: -1 });
}
}
//
$("#keepPwd").click(function(){
rmbPwd();
});
</script>
```