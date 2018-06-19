---
title: JS cookie 读写操作
tags:
  - cookie 读写
id: 1346
categories:
  - JS/Jq
date: 2015-08-26 21:42:06
---

```javascript
/***
** 功能：  cookie操作对象
***/
var cookies = {
    /***
    ** 功能：  写入cookie操作
    ** 参数：  name cookie名称
    **         value cookie值 
    **         expires 过期时间
    **         path  路径
    **         domain 域
    ***/
    set: function (name, value, expires, path, domain) {
        expires = new Date(new Date().getTime() + (((typeof expires == "undefined") ? 12 * 7200 : expires)) * 1000);
        var tempcookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "; path=/") +
        ((domain) ? "; domain=" + domain : "");
        (tempcookie.length < 4096) ? document.cookie = tempcookie : alert("The cookie is bigger than cookie lagrest");
    },

    /***
    ** 功能：  获取cookie操作
    ** 参数：  name cookie名称
    ***/
    get: function (name) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null)
            return unescape(xarr[2]);
        return null;
    },

    /***
    ** 功能：  删除cookie操作
    ** 参数：  name cookie名称
    **         path  路径
    **         domain 域
    ***/
    del: function (name, path, domain) {
        if (this.get(name))
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    },
    day: function (xd) {
        return xd * 24 * 3600;
    },
    hour: function (xh) {
        return xh * 3600;
    }
}
```