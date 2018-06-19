---
title: jquery实现的cookie操作插件
tags:
  - cookie
  - Cookie插件
  - jquery实现的cookie操作插件
  - jq实现cookie
id: 1961
categories:
  - JS/Jq
date: 2015-12-18 10:22:32
---

cookie虽说具有一定的确定，但是在某些问题的处理上还是非常好用的，这里就不列举了，这里提供一个jquery实现的操作cookie的插件，功能比较全面，希望给大家带来一定的帮助，代码如下:

```javascript
jQuery.cookie=function(name, value, options){
  if(typeof value != 'undefined'){ 
    options=options||{};
    if(value === null){
      value='';
      options.expires=-1;
    }
    var expires='';
    if(options.expires&amp;&amp;(typeof options.expires=='number'||options.expires.toUTCString)){
      var date;
      if(typeof options.expires=='number'){
        date=new Date();
        date.setTime(date.getTime()+(options.expires * 24 * 60 * 60 * 1000));
      } 
      else{
         date = options.expires;
      }
      expires= '; expires=' + date.toUTCString(); 
    }
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } 
  else{
    var cookieValue = null;
    if(document.cookie &amp;&amp; document.cookie != ''){
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++){
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')){
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
}
```
以上是一个操作cookie的功能强大的jquery插件。

**插件使用说明如下:**

1.jQuery.cookie("mycookie"),获取cookie。

2.jQuery.cookie("mycookie","cookievalue"),设置cookie的值。

3.jQuery.cookie("mycookie","cookievalue"，{expires: 3, path: '/', domain: 'jquery.com', secure: true})，创建一个cookie，并设置cookie的过期时间，路径，域名等。

4.jQuery.cookie("mycookie",null),删除一个cookie。