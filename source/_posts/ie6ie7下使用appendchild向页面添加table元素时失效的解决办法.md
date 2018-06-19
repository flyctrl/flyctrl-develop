---
title: 'IE6,IE7下使用appendChild向页面添加TABLE元素时失效的解决办法'
tags:
  - appendChild
id: 240
categories:
  - 前端兼容
date: 2015-07-13 13:56:11
---

近日，项目中有一个用JS向页面中添加动态生成的表格元素的代码，代码如下：
```javascript
var eleA = document.createElement("A");
var eleTd = document.createElement("TD");
var eleTr = document.createElement("TR");
var eleTable = document.createElement("TABLE");
eleTd.appendChild(eleA);
eleTr.appendChild(eleTd);
eleTable.appendChild(eleTr);
document.body.appendChild(eleTable);
```

在IE8、以及火狐下测试都没有问题，页面中会显示出添加表格后的样式，但是在IE6及IE7下却无法通过，查了很多资料，有的说是在IE6、7下不支持appendChild这个方法，后来经过验证，证实在IE6、7下是支持这个方法的，那这就奇怪了，为什么还是添加不了呢？ 后来终于依稀想起曾在某处见过一篇文章，说是TBODY的XX，具体的就实在是想不起来了。只好死马当活马医了，遂想到在动态创建TABLE的时候也向里面加一个TBODY，代码如下：

```javascript
var eleA = document.createElement("A");
eleA.innerHTML = "eleA";
var eleTbody = document.createElement("TBODY");
var eleTd = document.createElement("TD");
var eleTr = document.createElement("TR");
var eleTable = document.createElement("TABLE");
eleTd.appendChild(eleA);
eleTr.appendChild(eleTd);
eleTbody.appendChild(eleTr);
eleTable.appendChild(eleTbody);
document.body.appendChild(eleTable);
```
试之，果然显示正常。。OK。