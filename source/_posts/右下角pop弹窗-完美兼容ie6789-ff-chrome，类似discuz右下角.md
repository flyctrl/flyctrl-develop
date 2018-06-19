---
title: 右下角pop弹窗 完美兼容ie6789 ff chrome，类似discuz右下角
tags:
  - pop弹窗
id: 295
categories:
  - 插件库
date: 2015-07-13 15:05:41
---

&emsp;&emsp;网上找了很多，感觉不好用或者有问题，自己写一个以备后用：类似discuz右下角消息提示框
主要是用css position的fixed属性，但是ie6不支持此属性，通过jquery.fixed.js插件实现兼容
效果如下：

[![1](http://www.npm8.com/wp-content/uploads/2015/07/17.jpg)](http://www.npm8.com/wp-content/uploads/2015/07/17.jpg)

[Demo演示](http://demo.grycheng.com/case/pop/pop.html)

[点此下载](http://pan.baidu.com/s/1nt9W4pb)

调用方法非常简单
```html
<script type="text/javascript">
//记得加载jquery
//使用参数：1.标题，2.链接地址，3.内容简介
window.onload=function(){
    var pop=new Pop("这里是标题，哈哈","http://www.js7e.com/","请输入你的内容简介，这里是内容简介.请输入你的内容简介，这里是内容简介.请输入你的内容简介，这里是内容简介");
</script>
```
自己去下载来试一下吧  哈哈