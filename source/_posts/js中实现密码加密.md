---
title: JS中实现密码加密
tags:
  - js md5
  - JS中实现密码加密
id: 2091
categories:
  - JS/Jq
date: 2016-01-17 17:01:47
---

**1、base64加密**
在页面中引入base64.js文件，调用方法为：
```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>base64加密</title>
<script type="text/javascript" src="base64.js"></script>
<script type="text/javascript">
var b = new Base64();
var str = b.encode("admin:admin");
alert("base64 encode:" + str);
//解密
str = b.decode(str);
alert("base64 decode:" + str);
</script>
</head>

<body>
</body>
</html>
```
**2、md5加密**
在页面中引用md5.js文件，调用方法为:
```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>md5加密</title>
<script type="text/ecmascript" src="md5.js"></script>
<script type="text/javascript">
var hash = hex_md5("123dafd");
alert(hash)
</script>
</head>

<body>
</body>
</html>
```
**3、sha1加密**

据说这是最安全的加密
页面中引入sha1.js，调用方法为
```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>sha1加密</title>
<script type="text/ecmascript" src="sha1.js"></script>
<script type="text/javascript">
var sha = hex_sha1('mima123465')
alert(sha)
</script>
</head>

<body>
</body>
</html>
```
各js文件下载地址：

[base64.js](http://www.npm8.com/wp-content/uploads/2016/01/base64.js)

[md5.js](http://www.npm8.com/wp-content/uploads/2016/01/md5.js)

[sha1.js](http://www.npm8.com/wp-content/uploads/2016/01/sha1.js)