---
title: jquery的append函数在IE7下无效解决办法
tags:
  - ie7 append
id: 238
categories:
  - 前端兼容
date: 2015-07-13 13:54:02
---

使用jquery的函数append在页面上加带标签的内容，在FF下是没问题的，在IE7下总是加不上去

经过测试发现我的内容里面多一个

去掉之后就没问题了。看来IE7下append对标签的正确性非常敏感啊。
在网上查资料，append的另一个问题是:
当用到自定义标签时在IE7下也有这个问题。