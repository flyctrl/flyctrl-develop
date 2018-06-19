---
title: jq 地址栏链接与a标签链接匹配
tags:
  - 链接添加样式
id: 1356
categories:
  - JS/Jq
date: 2015-08-26 22:05:35
---

如题所述，当出现这样的功能，点击某个链接后，给跳转后的该链接地址添加样式，通过添加class为current来增加特殊样式。

如图所示：点击HTML+css3跳转后，给其添加如图样式：

[![241301071559287](http://www.npm8.com/wp-content/uploads/2015/08/241301071559287-650x31.png)](http://www.npm8.com/wp-content/uploads/2015/08/241301071559287.png)

js代码如下：
```javascript
var currUrl = window.location.href;

     var currStyle = function (links){

          links.each(function(){

               var url = $(this).attr('href');

               if (currUrl.indexOf(url) != -1){

                    $(this).addClass("current");

                    return false;

               }
          });
}
```
怎样调用呢？如下jquery调用代码：
```javascript
$(function(){

   currStyle($("#sidebar .list a"));

})
```
&nbsp;
这样就实现了如图所示的功能。
&nbsp;