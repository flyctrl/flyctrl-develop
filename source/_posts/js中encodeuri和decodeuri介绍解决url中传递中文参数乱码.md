---
title: js中encodeURI和decodeURI介绍(解决Url中传递中文参数乱码)
tags:
  - decodeURI
  - encodeURI
  - js url传递中文参数乱码
  - url 参数乱码
  - url传参乱码
  - url传递中文参数乱码
  - url传递参数乱码
id: 2102
categories:
  - JS/Jq
date: 2016-01-28 23:28:50
---

### **一、基本概念**
encodeURI和decodeURI是成对来使用的，因为浏览器的地址栏有中文字符的话，可以会出现不可预期的错误，所以可以encodeURI把非英文字符转化为英文编码，decodeURI可以用来把字符还原回来。encodeURI方法不会对下列字符进行编码：":"、"/"、";" 和 "?"，encodeURIComponent方法可以对这些字符进行编码。

decodeURI()方法相当于java.net.URLDecoder.decode(URIString, "UTF-8");

encodeURI()方法相当于java.net.URLEncoder.encode(URIString, "UTF-8");

### **二、例子**
```javascript
<script type="text/javascript">
var uriStr = "http://www.baidu.com?name=张三&amp;num=001 zs";
var uriec = encodeURI(encodeURI(uriStr));//注意：一般都是采取双重编码，否则有时会失效
document.write("编码后的" + uriec);
var uridc = decodeURI(uriec);
document.write("解码后的" + uridc);
</script>
```
编码后的http://www.baidu.com?name=%E5%BC%A0%E4%B8%89&amp;num=001%20zs
解码后的http://www.baidu.com?name=张三&amp;num=001 zs

### **三：Js的Url中传递中文参数乱码问题，重点：encodeURI编码，decodeURI解码：**

**1.传参页面**

Javascript代码：
```javascript
<script type=”text/javascript”>
function send(){
var url = "test01.html";
var userName = $("#userName").html();
window.open(encodeURI(encodeURI(url + "?userName=" + userName))); }
</script>
```

**2\. 接收参数页面：test02.html**
```javascript
<script>
var urlinfo = window.location.href;//获取url
var userName = urlinfo.split(“?”)[1].split(“=”)[1];//拆分url得到”=”后面的参数
$(“#userName”).html(decodeURI(userName));
</script>
```
### **四：如何获取Url“？”后，“=”的参数值：**

A.首先用window.location.href获取到全部url值。

B.用split截取“?”后的全部

C.split(“?”)后面的[1]内数字，默认从0开始计算

### **五：Js中escape，unescape，encodeURI，encodeURIComponent区别：**
1.传递参数时候使用，encodeURIComponent否则url中很容易被”#”，”？”，”&amp;”等敏感符号隔断。

2.url跳转时候使用，编码用encodeURI，解码用decodeURI。

3.escape() 只是为0-255以外 ASCII字符 做转换工作，转换成的 %u**** 这样的码，如果要用更多的字符如 UTF-8字符库 就一定要用 encodeURIComponent() 或 encodeURI() 转换才可以成 %nn%nn 这的码才可以,其它情况下escape，encodeURI，encodeURIComponent编码结果相同,所以为了全球的统一化进程，在用 encodeURIComponent() 或 encodeURI() 代替 escape() 使用吧！