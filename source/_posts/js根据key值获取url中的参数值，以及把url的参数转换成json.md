---
title: JS根据key值获取URL中的参数值，以及把URL的参数转换成json对象
tags:
  - URL的参数转换成json对象
  - 根据key值获取URL中的参数值
id: 1340
categories:
  - JS/Jq
date: 2015-08-26 21:38:19
---

//把url的参数部分转化成json对象 
```javascript
  parseQueryString: function (url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&amp;=]+)=([\w\W]*?)(&amp;|$|#)/g,
            arr_url = reg_url.exec(url),
            ret = {};
        if (arr_url &amp;&amp; arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }
```
// 通过key获取url中的参数值
```javascript
    getQueryString: function (name) {
        var reg = new RegExp("(^|&amp;)" + name + "=([^&amp;]*)(&amp;|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
```
