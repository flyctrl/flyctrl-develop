---
title: js 给页面所有的A标签加某个推广地址栏参数
tags:
  - js推广地址
id: 135
categories:
  - JS/Jq
date: 2015-07-12 18:47:21
---

```javascript
$(document).ready(function() {
addUrlParse();
});

// 获取地址栏的参数数组
function getUrlParams() {
var search = window.location.search;

// 写入数据字典
var tmparray = search.substr(1, search.length).split("&amp;");
var paramsArray = new Array;
if (tmparray != null) {
for (var i = 0; i < tmparray.length; i++) {
var reg = /[=|^==]/; // 用=进行拆分，但不包括==
var set1 = tmparray[i].replace(reg, '&amp;');
var tmpStr2 = set1.split('&amp;');
var array = new Array;
array[tmpStr2[0]] = tmpStr2[1];
paramsArray.push(array);
}
}
// 将参数数组进行返回
return paramsArray;
}
// 根据参数名称获取参数值
function GetQueryString(name) {
var paramsArray = getUrlParams();
if (paramsArray != null) {
for (var i = 0; i < paramsArray.length; i++) {
for (var j in paramsArray[i]) {

if (j.toLowerCase() == name.toLowerCase()) {
return paramsArray[i][j];
}
}
}
}
return null;
}

//function GetQueryString(name) {

// var reg = new RegExp("(^|&amp;)" + name + "=([^&amp;]*)(&amp;|$)");
// var r = window.location.search.substr(1).match(reg);
// if (r != null) return unescape(r[2]); return null;
//}

//搜索后添加推广ID 2013年5月23日16:16:51
function addUrlParse() {
var ruid = GetQueryString("referraluserid");
//alert("ruid=" + ruid);
if (ruid != "" &amp;&amp; ruid != null) {
var aStr = "ReferralUserId=" + ruid;

var url = window.location.search;
try {
$("a").each(function(i) {
var hrefstr = $(this).attr("href");
if (hrefstr != null &amp;&amp; hrefstr != "" &amp;&amp; hrefstr.indexOf("javascript:") < 0) {
var jinghao = "";
if (hrefstr.indexOf("#") > 0) {
var arr = hrefstr.split("#");
hrefstr = arr[0];
jinghao = arr[1];
}
// hrefstr = hrefstr + (hrefstr.indexOf("?") > 0 ? url.replace("?", "&amp;") : url);
if (hrefstr.toLowerCase().indexOf("referraluserid=") == -1)
hrefstr = hrefstr + (hrefstr.indexOf("?") > 0 ? "&amp;" + aStr : "?" + aStr);
if (jinghao != "") {
hrefstr += "#" + jinghao;
}
$(this).attr("href", hrefstr);
}
});
}
catch (e) {
alert(e);
}
/*
var hrefstr = "";
try {
var url = window.location.search;

$("a").each(function(i) {
hrefstr = $(this).attr("href");
// alert(hrefstr.indexOf("referraluserid=") + aStr);
if (hrefstr.indexOf("referraluserid=") == -1)
$(this).attr("href", $(this).attr("href") + (hrefstr.indexOf("?") > 0 ? "&amp;" + aStr : "?" + aStr));
});
}
catch (e) {
alert(e + " + " + hrefstr);
}

*/

}
}
//搜索后添加推广ID 2013年5月23日16:16:51
function addSearUrlParse() {

var ruid = GetQueryString("ReferralUserId");
if (ruid != "" &amp;&amp; ruid != null) {
var aStr = "&amp;ReferralUserId=" + ruid;
return aStr;
}
return "";
}
```