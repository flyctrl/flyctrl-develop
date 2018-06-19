---
title: 获取js文件后面的参数
tags:
  - 获取js文件后面的参数
id: 2517
categories:
  - JS/Jq
date: 2016-10-18 14:31:31
---

```<script type="text/javascript" src="tongji.js?id=loginbox"></script>```
就是如何获取id是多少了?

第一获取src
```javascript
/*
获取当前的js文件的路径
@method getJsPath
@param {string} jsname js文件名称
*/
function getJsPath(jsname) {  
    var js = document.scripts;  
    var jsPath = "";  
    for (var i = js.length; i > 0; i--) {  
        if (js[i - 1].src.indexOf(jsname) > -1) {  
            return js[i - 1].src;  
        }else{
        	return;
        }
    }  
    return jsPath;
}
```
第二从src中获取参数的值
```javascript
/*
获取js文件后面的参数  
@method getParam
@param {string} jspath js文件路径
@param {string} parm 参数名称 
*/
function getParam(jspath, parm){
	if (typeof jspath=='undefined') {return "";}
	if (jspath.indexOf('?')>0) {
		 var urlparse = jspath.split("\?");
	}else{
		return "";
	}
    var parms = urlparse[1].split("&");  
    var values = {};
    for(var i = 0; i < parms.length; i++) {
        var pr = parms[i].split("=");
        if (pr[0] == parm)  
        return pr[1];  
    }
    return "";
}
```