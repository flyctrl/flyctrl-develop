---
title: js常见的判断移动端或者pc端或者安卓和苹果浏览器的方法总结
tags:
  - 判断移动端或者pc端或者安卓和苹果浏览器的方法总结
id: 1820
categories:
  - JS/Jq
date: 2015-10-08 10:13:34
---

续[通过navigator判断浏览器版本或者手机类型](http://www.npm8.com/?p=1812)，里面介绍了运用navigator判断浏览器类型，在这篇文章基础上做个补充吧！

## js 判断安卓或者ios 之indexOf方式

```javascript
//判断访问终端
var browser={
versions:function(){
var u = navigator.userAgent, app = navigator.appVersion;
return {
trident: u.indexOf('Trident') > -1, //IE内核
presto: u.indexOf('Presto') > -1, //opera内核
webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
gecko: u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1,//火狐内核
mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
iPad: u.indexOf('iPad') > -1, //是否iPad
webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
qq: u.match(/\sQQ/i) == " qq" //是否QQ
};
}(),
language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
```
&nbsp;

### 使用方法：

```javascript
//判断是否IE内核
if(browser.versions.trident){ alert("is IE"); }
//判断是否webKit内核
if(browser.versions.webKit){ alert("is webKit"); }
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
```
&nbsp;

## js 判断安卓或者ios 之正则表达式方式

```javascript
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);  
   //苹果端
} else if (/(Android)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent); 
    //安卓端
} else {
   //pc端
};
```
&nbsp;