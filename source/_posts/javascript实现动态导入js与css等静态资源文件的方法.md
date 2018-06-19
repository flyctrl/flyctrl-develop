---
title: javascript实现动态导入js与css等静态资源文件的方法
tags:
  - js动态引入css文件
  - js动态引入js文件
id: 977
categories:
  - JS/Jq
date: 2015-07-26 15:28:19
---

这篇文章主要介绍了javascript实现动态导入js与css等静态资源文件的方法,基于回调函数实现该功能,具有一定参考借鉴价值,需要的朋友可以参考下。

本文实例讲述了javascript实现动态导入js与css等静态资源文件的方法。分享给大家供大家参考。具体实现方法如下：
```javascript
/**  * 动态导入静态资源文件js/css  */
var $import = function() {
	return function(rId, res, callback) {
		if (res &amp;&amp; 'string' == typeof res) {
			if (rId) {
				if ($($('#' + rId), $('head')).length > 0) {
					return;
				}
			}
			//加载资源文件
			var sType = res.substring(res.lastIndexOf('.') + 1);
			// 支持js/css
			if (sType &amp;&amp; ('js' == sType || 'css' == sType)) {
				var isScript = (sType == 'js');
				var tag = isScript ? 'script': 'link';
				var head = document.getElementsByTagName('head')[0];
				// 创建节点
				var linkScript = document.createElement(tag);
				linkScript.type = isScript ? 'text/javascript': 'text/css';
				linkScript.charset = 'UTF-8';
				if (!isScript) {
					linkScript.rel = 'stylesheet';
				}
				isScript ? linkScript.src = res: linkScript.href = res;
				if (callback &amp;&amp; 'function' == typeof callback) {
					if (linkScript.addEventListener) {
						linkScript.addEventListener('load',
						function() {
							callback.call();
						},
						false);
					} else if (linkScript.attachEvent) {
						linkScript.attachEvent('onreadystatechange',
						function() {
							var target = window.event.srcElement;
							if (target.readyState == 'complete') {
								callback.call();
							}
						});
					}
				}
				head.appendChild(linkScript);
			}
		}
	};
} ();
```