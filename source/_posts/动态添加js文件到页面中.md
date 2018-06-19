---
title: 动态添加JS文件到页面中
tags:
  - 动态添加JS文件
id: 1344
categories:
  - JS/Jq
date: 2015-08-26 21:40:42
---

```javascript
/***
** 功能：  加载外部JS文件，加载完成后执行回调函数callback
***/
var utools = {
    config: {
        id: "",
        url: "",
        charset: "gb2312",
        callback: function () { }
    },
    merge: function (a, c) {
        for (var b in c) a[b] = c[b];
        return a
    },
    getScript: function (a) {
        var r = Math.floor(Math.random() * 10000);
        this.config = this.merge(this.config, a);
        var callback = this.config.callback;
        var scriptNode = document.createElement("script");
        scriptNode.setAttribute("id", this.config.id);
        scriptNode.setAttribute('charset', this.config.charset);
        scriptNode.setAttribute('type', 'text/javascript');
        scriptNode.setAttribute('src', this.config.url + "?r=" + r);
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(scriptNode);
        scriptNode[document.all ? "onreadystatechange" : "onload"] = function () {
            if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                if (callback) callback();
                scriptNode.onreadystatechange = scriptNode.onload = null;
                scriptNode.parentNode.removeChild(scriptNode)
            }
        };
    }
}

//调用方式
utools.getScript({url:"js文件路径"});
```