---
title: javascript文件加载管理简单实现方法
tags:
  - js文件加载管理
id: 980
categories:
  - JS/Jq
date: 2015-07-26 15:34:02
---

本文实例讲述了javascript文件加载管理简单实现方法。分享给大家供大家参考。具体如下：

这里介绍超级简单的进行javascript的文件（模块）的加载管理，实现sea.js或者require.js核心功能，用一行`<script src="js/light/light.js"></script>`加载所有的js文件。好了，废话不多说，直接上码！

```javascript
//按照lightJs的顺序，让网页加载js文件： 
var lightJs = ["./js/light/pre/jquery-1.8.0.min.js", "./js/light/pre/jquery-lib.js", "./js/light/pre/less-1.4.2.min.js", "./js/lihgt/pre/util.js", "./js/xla.js", "./js/light/light_file.js"];
var light;
if (!light) light = {};
light.load = (function(lightJs) {
	if (!lightJs) lightJs = [];
	var doc = document;
	var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	for (var i = 0; i < lightJs.length; i++) {
		var path = lightJs[i];
		var node = doc.createElement("script");
		node.charset = "utf-8";
		node.src = path;
		head.appendChild(node);
	}
	return doc;
} (lightJs));
```
&nbsp;