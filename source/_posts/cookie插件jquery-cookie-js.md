---
title: Cookie插件jquery.cookie.js
tags:
  - Cookie插件
  - jquery.cookie.js
id: 1834
categories:
  - 插件库
date: 2015-10-09 17:12:33
---

Cookie是网站设计者放置在客户端的小文本文件。Cookie能为用户提供很多的使得，例如购物网站存储用户曾经浏览过的产品列表，或者门户网站记住用户喜欢选择浏览哪类新闻。 在用户允许的情况下，还可以存储用户的登录信息，使得用户在访问网站时不必每次都键入这些信息

Cookie下载地址：[http://plugins.jquery.com/project/cookie](http://plugins.jquery.com/project/cookie)

使用方法：

1.引入jquery.cookie.js
```html
<script src="scripts/jquery.js" type="text/javascript"></script>
<script src="scripts/jquery.cookie.js" type="text/javascript"></script>
```
2.使用方法

1).新添加一个会话 cookie：

$.cookie('the_cookie', 'the_value');

注：当没有指明 cookie有效时间时，所创建的cookie有效期默认到用户关闭浏览器为止，所以被称为

“会话cookie（session cookie）”。

2).创建一个cookie并设置有效时间为 7天:

$.cookie('the_cookie', 'the_value', { expires: 7 });

注：当指明了cookie有效时间时，所创建的cookie被称为“持久 cookie （persistent cookie）”。

3).创建一个cookie并设置 cookie的有效路径：

$.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });

注：在默认情况下，只有设置 cookie的网页才能读取该 cookie。如果想让一个页面读取另一个页面设

置的cookie，必须设置cookie的路径。cookie的路径用于设置能够读取 cookie的顶级目录。将这

个路径设置为网站的根目录，可以让所有网页都能互相读取 cookie （一般不要这样设置，防止出现冲突） 。

4).读取cookie：

$.cookie('the_cookie'); // cookie存在 => 'the_value'

$.cookie('not_existing'); // cookie不存在 => null

5).删除cookie，通过传递null作为cookie的值即可：

$.cookie('the_cookie', null);

3.将cookie写入文件
```javascript
var COOKIE_NAME = 'username';  
    if( $.cookie(COOKIE_NAME) ){  
        $("#username").val(  $.cookie(COOKIE_NAME) );  
    }  
    $("#check").click(function(){  
        if(this.checked){  
            $.cookie(COOKIE_NAME, $("#username").val() , { path: '/', expires: 10, domain: 'jquery.com', secure: true });  
            //var date = new Date();  
            //date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000)); //三天后的这个时候过期  
            //$.cookie(COOKIE_NAME, $("#username").val(), { path: '/', expires: date });  
        }else{  
            $.cookie(COOKIE_NAME, null, { path: '/' });  //删除cookie  
        }  
    });
```
参数设置：

expires: (Number | Date)

有效期，可以设置一个整数作为有效期（单位：天），也可以设置一个日期对象作为Cookie的过期日期。如果指定日期为负数，那么此cookie将被删除；如果不设置或者设置为null，那么此cookie将被当作Session Cookie处理，并且在浏览器关闭后删除

path: (String) Cookie的路径属性，默认是创建该cookie的页面路径

domain: (String) Cookie的域名属性，默认是创建该cookie的页面域名

secure: (Boolean) 如果设为true，那么此cookie的传输会要求一个安全协议，例如HTTPS